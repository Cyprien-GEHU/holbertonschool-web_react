import { render, screen } from "@testing-library/react";
import App from "./App";

test('texte h1 was wrote with "School Dashboard', async () => {
  render(<App />);
  const text = screen.getByRole("heading", {
    level: 1,
    name: /School dashboard/i,
  });
  expect(text).toBeInTheDocument();
});

test("render all p elements", async () => {
  const { container } = render(<App />);
  const bodyP = container.querySelector(".App-body p");
  const footerP = container.querySelector(".App-footer p");

  expect(bodyP).toBeInTheDocument();
  expect(bodyP.textContent).toMatch(/Login to access the full dashboard/i);

  expect(footerP).toBeInTheDocument();
  expect(footerP.textContent).toMatch(/Copyright \d{4}/i);
});

test("Check is a image has rendered with alt", () => {
  render(<App />);
  const img = screen.getByAltText(/holberton logo/i);
  expect(img).toBeInTheDocument();
});

test("render all input element ", () => {
  const { container } = render(<App />);
  const inpEmail = container.querySelector('input[type="email"]');
  const inpPassword = container.querySelector('input[type="password"]');

  expect(inpEmail).toBeInTheDocument();
  expect(inpPassword).toBeInTheDocument();
});

test("render all label element", () => {
  render(<App />);

  const labelEmail = screen.getByText(/email/i);
  const labelPassword = screen.getByText(/password/i);

  expect(labelEmail).toBeInTheDocument();
  expect(labelPassword).toBeInTheDocument();
});

test("render the button OK", () => {
  render(<App />);
  const button = screen.getByRole("button", { name: /ok/i });
  expect(button).toBeInTheDocument();
});
