import '@testing-library/jest-dom';

import { expect } from '@jest/globals';
import { toBeInTheDocument, toHaveTextContent } from '@testing-library/jest-dom/matchers';

expect.extend({ toBeInTheDocument, toHaveTextContent });

window.matchMedia = window.matchMedia || function() {
  return {
    matches: false,
    addListener: function() {},
    removeListener: function() {}
  };
};

const localStorageMock = (function() {
  let store = {};

  return {
    getItem: function(key) {
      return store[key] || null;
    },
    setItem: function(key, value) {
      store[key] = value.toString();
    },
    removeItem: function(key) {
      delete store[key];
    },
    clear: function() {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

jest.mock('jsonwebtoken', () => ({
  decode: jest.fn(() => ({ username: 'testuser' }))
}));

global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  error: jest.fn(),
};
