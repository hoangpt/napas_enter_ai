// @ts-nocheck
import fetch from 'node-fetch';
import moment from 'moment';
import bird from 'bluebird';
import _ from 'lodash';
import { jiraConstants } from 'constants/index';

const { URL, PROJECT_KEY, TOKEN, FOLDER, FEATURE_GROUPS } = jiraConstants;

const shouldDeleteTest = false;

const getCurrentTime = () => {
  return moment().format('YYYY-MM-DDThh:mm:ss');
};

/**
 * Get the correct team's folder on Jira by the issue key
 * Eg: /HN6/Frontend/Teko Admin Boilerplate/UX4STAFF-1415
 * @param issueKey the issue key on Jira
 */
const getFolder = (issueKey: string) => {
  const issueKeyGroup = Object.keys(FEATURE_GROUPS).find(key =>
    FEATURE_GROUPS[key].includes(issueKey)
  );
  return issueKeyGroup
    ? `${FOLDER}/${issueKeyGroup}/${issueKey}`
    : `${FOLDER}/${issueKey}`;
};

export default class JiraTestRunner {
  constructor() {
    this.url = URL + '/rest/atm/1.0';
    this.projectKey = PROJECT_KEY;
    this.authString = 'Basic ' + TOKEN;
  }

  // Generate Jira token (used for first time)
  generateToken = () => {
    const accessToken = Buffer.from('<jira_username>:<jira_password>').toString(
      'base64'
    );
    return accessToken;
  };

  // Get all test cases of a task
  async getTestsInIssue(issueKey) {
    const responseFetch = await fetch(
      this.url +
        `/testcase/search?query=projectKey = "${this.projectKey}" AND issueKeys IN (${issueKey})`,
      {
        method: 'GET',
        headers: { Authorization: this.authString },
      }
    ).then(res => res.json());

    return responseFetch.map(per => ({ name: per['name'], key: per['key'] }));
  }

  // Create test case on Jira
  async createTest(testName, issueKey) {
    const response = await fetch(this.url + '/testcase', {
      method: 'POST',
      body: JSON.stringify({
        name: testName,
        projectKey: this.projectKey,
        folder: getFolder(issueKey),
        labels: [issueKey],
        issueLinks: [issueKey],
        status: 'Approved',
      }),
      headers: {
        Authorization: this.authString,
        'Content-Type': 'application/json',
      },
    }).then(res => res.json());

    const testKey = response['key'];
    return testKey;
  }

  // Delete test case on Jira
  async deleteTest(testKey) {
    return fetch(this.url + '/testcase/' + testKey, {
      method: 'DELETE',
      headers: {
        Authorization: this.authString,
        'Content-Type': 'application/json',
      },
    });
  }

  // Create test cycle on Jira
  createTestCycle(name, issueKey, items) {
    return fetch(this.url + '/testrun', {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        projectKey: this.projectKey,
        folder: getFolder(issueKey),
        issueKey: issueKey,
        plannedStartDate: getCurrentTime(),
        plannedEndDate: getCurrentTime(),
        items: items,
      }),
      headers: {
        Authorization: this.authString,
        'Content-Type': 'application/json',
      },
    });
  }

  // Create test folder on Jira
  async createTestFolder(issueKey) {
    // Create folder for test cases
    await fetch(this.url + '/folder', {
      method: 'POST',
      body: JSON.stringify({
        projectKey: this.projectKey,
        name: getFolder(issueKey),
        type: 'TEST_CASE',
      }),
      headers: {
        Authorization: this.authString,
        'Content-Type': 'application/json',
      },
    });
    // Create folder for test cycle
    await fetch(this.url + '/folder', {
      method: 'POST',
      body: JSON.stringify({
        projectKey: this.projectKey,
        name: getFolder(issueKey),
        type: 'TEST_RUN',
      }),
      headers: {
        Authorization: this.authString,
        'Content-Type': 'application/json',
      },
    });
  }
}

const testCases = {};
export const itJira = (issueKey, name, fn, timeout?: number) => {
  testCases[issueKey] = testCases[issueKey] || [];
  const testCase = it(name, fn, timeout);
  testCases[issueKey].push(testCase);
};

const getMapNameToKey = async (
  jiraTestRunner,
  issueKey,
  testStringLocals,
  testsOnJira
) => {
  return bird.reduce(
    testStringLocals,
    async (acc, nameTest) => {
      const testOnJira = _.find(
        testsOnJira,
        testOnJira => nameTest === testOnJira.name
      );

      acc[nameTest] = testOnJira
        ? testOnJira.key
        : await jiraTestRunner.createTest(nameTest, issueKey);
      return await acc;
    },
    {}
  );
};

const deleteTestOnJira = (jiraTestRunner, mapNameToKey, testsOnJira) => {
  return bird.all(
    testsOnJira
      .filter(tJira => !mapNameToKey[tJira.name])
      .map(dJira => jiraTestRunner.deleteTest(dJira.key))
  );
};

// Get result test cases after submit test to Jira
const getResultTestCases = async (jiraTestRunner, issueKey) => {
  const testsOnJira = await jiraTestRunner.getTestsInIssue(issueKey);

  const mapNameToKey = await getMapNameToKey(
    jiraTestRunner,
    issueKey,
    _.map(testCases[issueKey], 'result.fullName'),
    testsOnJira
  );

  if (shouldDeleteTest)
    await deleteTestOnJira(jiraTestRunner, mapNameToKey, testsOnJira);

  const getItemsPromises = testCases[issueKey].map(async tc => {
    const name = tc.result.fullName;
    return {
      testCaseKey: mapNameToKey[name],
      status: tc.result.status === 'passed' ? 'Pass' : 'Fail',
    };
  });

  return Promise.all(getItemsPromises);
};

const submitAfterTest = (jiraTestRunner, issueKey) => {
  afterAll(async done => {
    try {
      // Create folder for test cases & test cycle on Jira
      await jiraTestRunner.createTestFolder(issueKey);
      // Create test case marked with the Jira issue key
      const items = await getResultTestCases(jiraTestRunner, issueKey);
      // Create test cycle for test cases above
      await jiraTestRunner.createTestCycle(issueKey, issueKey, items);
    } catch (error) {
    } finally {
      done();
    }
  });
};

// Submit tests to Jira
export const submitTestJira = issueList => {
  if (issueList.length) {
    const jiraTestRunner = new JiraTestRunner();
    issueList.forEach(issueKey => {
      submitAfterTest(jiraTestRunner, issueKey);
    });
  }
};
