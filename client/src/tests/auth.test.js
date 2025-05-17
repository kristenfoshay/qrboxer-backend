import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Route } from 'react-router-dom';
import LoginForm from '../auth/LoginForm';
import SignupForm from '../auth/SignupForm';
import UserContext from '../UserContext';

describe('LoginForm', () => {
  // Mock login function
  const mockLogin = jest.fn();
  
  beforeEach(() => {
    mockLogin.mockClear();
  });

  test('renders login form', () => {
    render(
      <MemoryRouter>
        <LoginForm login={mockLogin} />
      </MemoryRouter>
    );
    
    expect(screen.getByText('My Account')).toBeInTheDocument();
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('submitting form calls login function with form data', async () => {
    // Mock successful login
    mockLogin.mockResolvedValue({ success: true });
    
    const { getByLabelText, getByRole } = render(
      <MemoryRouter>
        <LoginForm login={mockLogin} />
      </MemoryRouter>
    );
    
    // Fill out the form
    fireEvent.change(getByLabelText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(getByLabelText('Password'), { target: { value: 'password123' } });
    
    // Submit the form
    fireEvent.click(getByRole('button', { name: /login/i }));
    
    // Check if login was called with correct data
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        username: 'testuser',
        password: 'password123'
      });
    });
  });

  test('displays error message on failed login', async () => {
    // Mock failed login
    mockLogin.mockResolvedValue({ success: false, errors: ['Invalid credentials'] });
    
    const { getByLabelText, getByRole } = render(
      <MemoryRouter>
        <LoginForm login={mockLogin} />
      </MemoryRouter>
    );
    
    // Fill out the form
    fireEvent.change(getByLabelText('Username'), { target: { value: 'wronguser' } });
    fireEvent.change(getByLabelText('Password'), { target: { value: 'wrongpass' } });
    
    // Submit the form
    fireEvent.click(getByRole('button', { name: /login/i }));
    
    // Check if error message is displayed
    await waitFor(() => {
      expect(screen.getByText(/Oops! That password\/username combo is invalid!/i)).toBeInTheDocument();
    });
  });

  test('redirects to homepage on successful login', async () => {
    // Mock successful login
    mockLogin.mockResolvedValue({ success: true });
    
    // Use a more complex router setup to test navigation
    const { getByLabelText, getByRole } = render(
      <MemoryRouter initialEntries={['/login']}>
        <Route path="/login">
          <LoginForm login={mockLogin} />
        </Route>
        <Route path="/" exact>
          <div>Homepage</div>
        </Route>
      </MemoryRouter>
    );
    
    // Fill out the form
    fireEvent.change(getByLabelText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(getByLabelText('Password'), { target: { value: 'password123' } });
    
    // Submit the form
    fireEvent.click(getByRole('button', { name: /login/i }));
    
    // Check for redirection to homepage
    await waitFor(() => {
      expect(screen.getByText('Homepage')).toBeInTheDocument();
    });
  });
});

describe('SignupForm', () => {
  // Mock signup function
  const mockSignup = jest.fn();
  
  beforeEach(() => {
    mockSignup.mockClear();
  });

  test('renders signup form', () => {
    render(
      <MemoryRouter>
        <SignupForm signup={mockSignup} />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Create an Account')).toBeInTheDocument();
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('First Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  test('submitting form calls signup function with form data', async () => {
    // Mock successful signup
    mockSignup.mockResolvedValue({ success: true });
    
    const { getByLabelText, getByRole } = render(
      <MemoryRouter>
        <SignupForm signup={mockSignup} />
      </MemoryRouter>
    );
    
    // Fill out the form
    fireEvent.change(getByLabelText('Username'), { target: { value: 'newuser' } });
    fireEvent.change(getByLabelText('Email'), { target: { value: 'newuser@example.com' } });
    fireEvent.change(getByLabelText('First Name'), { target: { value: 'New' } });
    fireEvent.change(getByLabelText('Last Name'), { target: { value: 'User' } });
    fireEvent.change(getByLabelText('Password'), { target: { value: 'password123' } });
    
    // Submit the form
    fireEvent.click(getByRole('button', { name: /submit/i }));
    
    // Check if signup was called with correct data
    await waitFor(() => {
      expect(mockSignup).toHaveBeenCalledWith({
        username: 'newuser',
        email: 'newuser@example.com',
        firstName: 'New',
        lastName: 'User',
        password: 'password123'
      });
    });
  });

  test('displays error message on failed signup', async () => {
    // Mock failed signup
    mockSignup.mockResolvedValue({ success: false, errors: ['Username already taken'] });
    
    const { getByLabelText, getByRole } = render(
      <MemoryRouter>
        <SignupForm signup={mockSignup} />
      </MemoryRouter>
    );
    
    // Fill out the form
    fireEvent.change(getByLabelText('Username'), { target: { value: 'existinguser' } });
    fireEvent.change(getByLabelText('Email'), { target: { value: 'existing@example.com' } });
    fireEvent.change(getByLabelText('First Name'), { target: { value: 'Existing' } });
    fireEvent.change(getByLabelText('Last Name'), { target: { value: 'User' } });
    fireEvent.change(getByLabelText('Password'), { target: { value: 'password123' } });
    
    // Submit the form
    fireEvent.click(getByRole('button', { name: /submit/i }));
    
    // Check if error message is displayed
    await waitFor(() => {
      expect(screen.getByText(/Username already taken/i)).toBeInTheDocument();
    });
  });

  test('redirects to homepage on successful signup', async () => {
    // Mock successful signup
    mockSignup.mockResolvedValue({ success: true });
    
    // Use a more complex router setup to test navigation
    const { getByLabelText, getByRole } = render(
      <MemoryRouter initialEntries={['/signup']}>
        <Route path="/signup">
          <SignupForm signup={mockSignup} />
        </Route>
        <Route path="/" exact>
          <div>Homepage</div>
        </Route>
      </MemoryRouter>
    );
    
    // Fill out the form
    fireEvent.change(getByLabelText('Username'), { target: { value: 'newuser' } });
    fireEvent.change(getByLabelText('Email'), { target: { value: 'newuser@example.com' } });
    fireEvent.change(getByLabelText('First Name'), { target: { value: 'New' } });
    fireEvent.change(getByLabelText('Last Name'), { target: { value: 'User' } });
    fireEvent.change(getByLabelText('Password'), { target: { value: 'password123' } });
    
    // Submit the form
    fireEvent.click(getByRole('button', { name: /submit/i }));
    
    // Check for redirection to homepage
    await waitFor(() => {
      expect(screen.getByText('Homepage')).toBeInTheDocument();
    });
  });
});