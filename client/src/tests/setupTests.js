// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Explicitly extend jest's expect with jest-dom matchers
import { expect } from '@jest/globals';
import { toBeInTheDocument, toHaveTextContent } from '@testing-library/jest-dom/matchers';

expect.extend({ toBeInTheDocument, toHaveTextContent });

// Mock window.matchMedia which is not implemented in JSDOM
window.matchMedia = window.matchMedia || function() {
  return {
    matches: false,
    addListener: function() {},
    removeListener: function() {}
  };
};

// Mock localStorage
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

// Set up jwt mock
jest.mock('jsonwebtoken', () => ({
  decode: jest.fn(() => ({ username: 'testuser' }))
}));

// Silence console errors during tests
global.console = {
  ...console,
  // Comment out for test clarity
  log: jest.fn(),
  debug: jest.fn(),
  error: jest.fn(),
  // warn: jest.fn(),
};