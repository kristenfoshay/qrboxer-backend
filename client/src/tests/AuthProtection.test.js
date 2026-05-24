import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import QRBoxerApi from '../api/api';
import jwt from "jsonwebtoken";

jest.mock('../api/api');

jest.mock('jsonwebtoken', () => ({
  decode: jest.fn(() => ({ username: 'testuser' }))
}));

jest.mock('../homepage/Homepage', () => {
  const React = require('react');
  return function MockHomepage() {
    return React.createElement('div', null, [
      React.createElement('h1', null, 'Welcome to QRBoxer'),
      React.createElement('a', { href: '/login', key: 'login' }, 'Login'),
      React.createElement('a', { href: '/signup', key: 'signup' }, 'Signup')
    ]);
  };
});

jest.mock('../moves/Moves', () => {
  const React = require('react');
  return function MockMoves({ createmove }) {
    return React.createElement('div', null, 'Moves');
  };
});

jest.mock('../routes-nav/NavBar', () => {
  const React = require('react');
  return function MockNavBar({ logout }) {
    return React.createElement('div', null, [
      React.createElement('a', { href: '/', key: 'home' }, 'Home'),
      React.createElement('a', { href: '/login', key: 'login' }, 'Login'),
      React.createElement('a', { href: '/my-account', key: 'account' }, 'My Account')
    ]);
  };
});

describe('Authentication and Route Protection', () => {
  beforeEach(() => {
    jest.resetAllMocks();

    localStorage.clear();
  });

  test('protected routes redirect unauthenticated users', async () => {
    QRBoxerApi.getCurrentUser.mockResolvedValue(null);

    render(
      <MemoryRouter initialEntries={['/moves']}>
        <App />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.queryByText(/Moves/i)).not.toBeInTheDocument();

      expect(screen.getByText(/Welcome to QRBoxer/i)).toBeInTheDocument();
    });
  });

  test('protected routes redirect unauthenticated users', async () => {
    QRBoxerApi.getCurrentUser.mockResolvedValue(null);

    render(
      <MemoryRouter initialEntries={['/moves']}>
        <App />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.queryByText(/Moves/i)).not.toBeInTheDocument();

      expect(screen.getByText(/Welcome to QRBoxer/i)).toBeInTheDocument();
    });
  });
});

import { fireEvent } from '@testing-library/react';
