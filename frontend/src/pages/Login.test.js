import React from 'react';
import { render, screen, fireEvent, waitFor } from '../tests/test-utils';
import Login from './Login';

test('renders login form', () => {
  render(<Login />);
  const emailInput = screen.getByPlaceholderText(/Email/i);
  const passwordInput = screen.getByPlaceholderText(/Password/i);
  const loginButton = screen.getByText(/Login/i);

  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(loginButton).toBeInTheDocument();
});

test('submits login form and handles failure', async () => {
  render(<Login />);
  const emailInput = screen.getByPlaceholderText(/Email/i);
  const passwordInput = screen.getByPlaceholderText(/Password/i);
  const loginButton = screen.getByText(/Login/i);

  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password' } });
  fireEvent.click(loginButton);

  // Ожидание появления сообщения
  await waitFor(() => {
    const message = screen.getByText(/Login failed/i);
    expect(message).toBeInTheDocument();
  });
});
