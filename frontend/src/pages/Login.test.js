import React from "react";
import { render, screen, fireEvent, waitFor } from "../tests/test-utils";
import { MemoryRouter } from "react-router-dom";
import Login from "./Login";
import "@testing-library/jest-dom";

test("renders login form", () => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );
  const emailInput = screen.getByPlaceholderText(/Email/i);
  const passwordInput = screen.getByPlaceholderText(/Пароль/i);
  const loginButton = screen.getByText(/Увійти/i);

  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(loginButton).toBeInTheDocument();
});

test("submits login form and handles failure", async () => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );
  const emailInput = screen.getByPlaceholderText(/Email/i);
  const passwordInput = screen.getByPlaceholderText(/Пароль/i);
  const loginButton = screen.getByText(/Увійти/i);

  fireEvent.change(emailInput, { target: { value: "test@example.com" } });
  fireEvent.change(passwordInput, { target: { value: "password" } });
  fireEvent.click(loginButton);

  // Очікування появи повідомлення
  await waitFor(() => {
    const message = screen.getByText(/Успішний вхід/i);
    expect(message).toBeInTheDocument();
  });
});
