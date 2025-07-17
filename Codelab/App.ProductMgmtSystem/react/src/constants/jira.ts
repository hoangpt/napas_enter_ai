// The feature groups mapping with story issue key
// Eg: The story UX4STAFF-1415 is belong to the feature group Teko Admin Boilerplate
const FEATURE_GROUPS = {
  'Teko Admin Boilerplate': ['UX4STAFF-1415'],
};

// Replace config below with your configs
export default {
  URL: 'https://jira.teko.vn', // Teko's Jira url
  TOKEN: 'bGluaC52aDphYmNkMTIzNA==', // Use the generateToken func from services/jira.ts to get token
  PROJECT_KEY: 'ERP2020', // Your project key on Jira (eg: ERP2020)
  FOLDER: '/HN6/Frontend', // Your team's folder on Jira
  FEATURE_GROUPS,
};
