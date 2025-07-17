// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import fs from 'fs';
import { createBrowserHistory } from 'history';

// Global env config
global.config = { iam: {}, tracker: {}, apiServices: {} };

// Ignore test console
global.console.error = jest.fn();
global.console.warn = jest.fn();

// Mock TekoID
jest.mock('teko-oauth2', () => {
  return {
    init: () => Promise.resolve({}),
  };
});

// Mock axios
jest.mock('axios', () => {
  return {
    get: jest.fn(() => Promise.resolve({ data: {} })),
    post: jest.fn(() => Promise.resolve({ data: {} })),
    interceptors: {
      response: {
        use: jest.fn(() => {}),
      },
    },
    defaults: {
      transformResponse: [],
      transformRequest: [],
    },
    create: jest.fn(() => {
      return {
        get: jest.fn(() => Promise.resolve({ data: { result: {} } })),
        post: jest.fn(() => Promise.resolve({ data: { result: {} } })),
        patch: jest.fn(() => Promise.resolve({ data: { result: {} } })),
        put: jest.fn(() => Promise.resolve({ data: { result: {} } })),
        delete: jest.fn(() => Promise.resolve({ data: { result: {} } })),
        interceptors: {
          response: {
            use: jest.fn(() => {}),
          },
          request: {
            use: jest.fn(() => {}),
          },
        },
        defaults: {
          transformResponse: [],
          transformRequest: [],
        },
      };
    }),
  };
});

// Mock tracker-js
const mockHistory = createBrowserHistory();
jest.mock('react-tracker-teko', () => {
  return jest.fn().mockImplementation(() => {
    return { connectToHistory: () => mockHistory };
  });
});
global.track = jest.fn();

// Custom mocks
global.matchMedia =
  global.matchMedia ||
  function() {
    return {
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  };

// Mock all services
const apiDir = 'src/services/apis';
const ignoreFiles = ['request.ts'];
fs.readdirSync(apiDir)
  .filter((file: string) => !ignoreFiles.includes(file))
  .forEach((file: string) => {
    const path = `../${apiDir}/${file}`;
    jest.doMock(path, () => jest.requireActual(path.replace('apis', 'mocks')));
  });

// Mock darkreader
jest.mock('darkreader', () => {
  return {
    enable: jest.fn(),
    disable: jest.fn(),
    auto: jest.fn(),
    setFetchMethod: jest.fn(),
  };
});
