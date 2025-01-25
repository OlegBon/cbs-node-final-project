import React from "react";
import { render, screen } from "./tests/test-utils";
import App from "./App";
import "@testing-library/jest-dom";

describe("App Component Tests", () => {
  test("renders login link", () => {
    render(<App />);
    const loginLink = screen.getByText(/увійдіть/i);
    expect(loginLink).toBeInTheDocument();
  });

  test("renders register link", () => {
    render(<App />);
    const registerLink = screen.getByText(/зареєструйтеся/i);
    expect(registerLink).toBeInTheDocument();
  });
});
