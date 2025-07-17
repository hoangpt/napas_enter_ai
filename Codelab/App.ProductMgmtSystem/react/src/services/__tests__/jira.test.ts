import { submitTestJira } from 'services/jira';
import { cleanup } from '@testing-library/react';
import { execSync } from 'child_process';

/*
 * Run all tests that include ISSUES and submit to Jira.
 * Add issue keys to ISSUES and run: yarn test:jira
 * E.g: ISSUES=['UX4STAFF-123', 'UX4STAFF-124']
 */

// Remember to empty this array before code commit
const ISSUES: string[] = [];

const patterns = ISSUES.map(key => `'${key}'`);

const getCommand = () => {
  switch (process.platform) {
    case 'linux': {
      return `egrep -lr "${patterns.join('|')}" ./src --include="*test.ts*"`;
    }
    case 'win32': {
      return `findstr /sm ${patterns.join(' ')} *.test.ts*`;
    }
    default: {
      throw Error('The current OS has not been supported yet');
    }
  }
};

if (ISSUES.length) {
  let paths: string[] = [];
  try {
    paths = execSync(getCommand())
      .toString()
      .split(/\s+/)
      .filter(path => path && !path.includes('jira.test.ts'))
      .map(path => path.replace(`./src/`, '').replace(/^src\\/, ''));
  } catch (error) {
    console.log(error.message);
  }

  submitTestJira(ISSUES);

  paths.forEach((path: string) => {
    describe('', () => {
      require(path);
      cleanup();
    });
  });
}
