import { render, screen } from '@testing-library/react';
import App from './App.jsx';

test('renders header title', () => {
  render(<App />);
  const titleElement = screen.getByText(/user_list/i);
  expect(titleElement).toBeInTheDocument();
});
