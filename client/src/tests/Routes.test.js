import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Routes from '../routes-nav/Routes';
import UserContext from '../UserContext';

jest.mock('../homepage/Homepage', () => () => <div>Homepage</div>);
jest.mock('../auth/LoginForm', () => ({ login }) => <div>Login Form</div>);
jest.mock('../auth/SignupForm', () => ({ signup }) => <div>Signup Form</div>);
jest.mock('../moves/Moves', () => ({ createmove }) => <div>Moves</div>);
jest.mock('../boxes/Boxes', () => () => <div>Boxes</div>);
jest.mock('../items/Items', () => () => <div>Items</div>);
jest.mock('../users/User', () => () => <div>User Profile</div>);
jest.mock('../moves/Move', () => () => <div>Single Move</div>);
jest.mock('../boxes/Box', () => () => <div>Single Box</div>);
jest.mock('../boxes/Printlabel', () => () => <div>Print Label</div>);
jest.mock('../items/Item', () => () => <div>Single Item</div>);
jest.mock('../profiles/ProfileForm', () => () => <div>Edit Profile</div>);

const renderWithRouter = (path, currentUser = null) => {
  return render(
    <UserContext.Provider value={{ currentUser }}>
      <MemoryRouter initialEntries={[path]}>
        <Routes
          login={() => {}}
          signup={() => {}}
          createmove={() => {}}
          createbox={() => {}}
          createitem={() => {}}
          removebox={() => {}}
          removeitem={() => {}}
        />
      </MemoryRouter>
    </UserContext.Provider>
  );
};

describe('Routes component', () => {
  test('renders homepage at /', () => {
    renderWithRouter('/');
    expect(screen.getByText('Homepage')).toBeInTheDocument();
  });

  test('renders login form at /login', () => {
    renderWithRouter('/login');
    expect(screen.getByText('Login Form')).toBeInTheDocument();
  });

  test('renders signup form at /signup', () => {
    renderWithRouter('/signup');
    expect(screen.getByText('Signup Form')).toBeInTheDocument();
  });

  test('renders moves page at /moves', () => {
    renderWithRouter('/moves');
    expect(screen.getByText('Moves')).toBeInTheDocument();
  });

  test('renders boxes page at /boxes', () => {
    renderWithRouter('/boxes');
    expect(screen.getByText('Boxes')).toBeInTheDocument();
  });

  test('renders items page at /items', () => {
    renderWithRouter('/items');
    expect(screen.getByText('Items')).toBeInTheDocument();
  });

  test('renders specific move page at /moves/:id', () => {
    renderWithRouter('/moves/1');
    expect(screen.getByText('Single Move')).toBeInTheDocument();
  });

  test('renders specific box page at /boxes/:id', () => {
    renderWithRouter('/boxes/1');
    expect(screen.getByText('Single Box')).toBeInTheDocument();
  });

  test('renders print label page at /boxes/:id/print', () => {
    renderWithRouter('/boxes/1/print');
    expect(screen.getByText('Print Label')).toBeInTheDocument();
  });

  test('renders specific item page at /items/:id', () => {
    renderWithRouter('/items/1');
    expect(screen.getByText('Single Item')).toBeInTheDocument();
  });

  test('renders profile form at /profile', () => {
    renderWithRouter('/profile');
    expect(screen.getByText('Edit Profile')).toBeInTheDocument();
  });

  test('redirects to homepage for unknown routes', () => {
    renderWithRouter('/unknown-route');
    expect(screen.getByText('Homepage')).toBeInTheDocument();
  });
});
