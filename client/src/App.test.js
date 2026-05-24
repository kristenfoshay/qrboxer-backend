import { render, screen } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';

jest.mock('./useLocalStorage', () => ({
  __esModule: true,
  default: () => ["test-token", jest.fn()]
}));

test('renders App component', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
});
