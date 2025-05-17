# QRBoxer Frontend Testing Guide

This document provides an overview of the testing approach for the QRBoxer frontend application.

## Testing Structure

The testing suite is organized as follows:

1. **Route Tests** (`Routes.test.js`)
   - Tests that all routes render the correct components
   - Tests redirection behavior

2. **Authentication Tests** (`auth.test.js`)
   - Tests login form functionality
   - Tests signup form functionality
   - Tests form validation and error handling

3. **Authentication Protection Tests** (`AuthProtection.test.js`)
   - Tests that unauthenticated users are redirected from protected routes
   - Tests that authenticated users can access protected routes
   - Tests token handling and expiration

4. **App Integration Tests** (`App.test.js`) 
   - Tests overall application behavior
   - Tests user flows across the application

## Running Tests

### During Development

During development, you can run tests in watch mode, which will re-run tests when files change:

```bash
npm test
```

### For CI/CD

Tests are automatically run during the build process. This ensures that the application is only built if all tests pass:

```bash
npm run build
```

You can also run tests in CI mode manually:

```bash
npm run test:ci
```

## Mocking

The tests use Jest's mocking capabilities to mock:

1. **API Calls** - All calls to the backend API are mocked to avoid actual network requests
2. **localStorage** - Browser's localStorage is mocked to test persistence
3. **React Router** - MemoryRouter is used to test routing behavior

## Test Coverage

To see test coverage, run:

```bash
npm test -- --coverage
```

## Adding New Tests

When adding new features or components:

1. Create corresponding test files next to the component files
2. Use the existing mocks for API calls
3. Follow the patterns in existing tests for consistency

## Known Issues

1. **AuthProtection.test.js** - This test has been temporarily disabled (renamed to .skip) due to issues with JSX in the jest.mock() calls. The test requires a proper configuration to handle JSX in mock function factories.
   
2. **App.test.js Form Tests** - Several tests that interact with form elements have been temporarily skipped. This is due to changes in how the form components are rendered and labeled. These tests need to be updated to match the current component structure.

## Common Testing Patterns

### Testing Protected Routes

```jsx
test('protected route redirects unauthenticated users', () => {
  // Render with unauthenticated user
  // Attempt to access protected route
  // Verify redirect happens
});
```

### Testing Form Submission

```jsx
test('form submits with correct values', async () => {
  // Fill form fields
  // Submit form
  // Verify API called with correct values
});
```

### Testing Error Handling

```jsx
test('form shows error message on failure', async () => {
  // Mock API to return error
  // Submit form
  // Verify error message is displayed
});
```