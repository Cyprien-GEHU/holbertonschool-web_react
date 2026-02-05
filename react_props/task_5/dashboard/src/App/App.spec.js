import { render, screen } from "@testing-library/react";
import App from "./App";
import { expect, test } from "@jest/globals";

test("Return the title of the website", () => {
  render(<App />);

  expect(screen.getByRole("heading")).toHaveTextContent(/School dashboard/i);
});

test("Return all paragrphs on the web site", () => {
  render(<App />);

  expect(screen.getByText(/Login to access the full dashboard/i));
  expect(screen.getByText(/Copyright 2026 - holberton School/i));
});

test("return the picture", () => {
  render(<App />);

  expect(screen.getByAltText(/holberton logo/i)).toBeInTheDocument();
});

test("return all input for login", () => {
  render(<App />);
  const inp = screen.getAllByRole("textbox");
  const password = screen.getByLabelText(/password/i);

  expect(inp.length + 1).toBe(2);
  expect(password).toBeInTheDocument();
});

test("return all label for login", () => {
  render(<App />);
  const lab = screen.getAllByText(/email|password/i);
  expect(lab).toHaveLength(2);
});

test("render the button OK", () => {
  render(<App />);

  expect(screen.getByText(/ok/i));
});

test("render the login when isloggedIn is false", () => {
  render(<App isLoggedIn={false} />);
  expect(
    screen.getByText(/Login to access the full dashboard/i),
  ).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
});

test("rend the courslist when isloggedIn is true", () => {
  render(<App isLoggedIn={true} />);
  expect(screen.getByText(/available courses/i)).toBeInTheDocument();
  expect(
    screen.queryByText(/Login to access the full dashboard/i),
  ).not.toBeInTheDocument();
});
