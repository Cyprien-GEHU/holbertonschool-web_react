import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "./Login";

let consoleSpy;

beforeEach(() => {
  consoleSpy = jest.spyOn(console, "log").mockImplementation();
});

afterEach(() => {
  consoleSpy.mockRestore();
});

test("renders 2 labels, 2 inputs and 1 button element", () => {
  const { container } = render(<Login />);

  const labels = container.querySelectorAll("label");
  expect(labels).toHaveLength(2);

  const inputs = container.querySelectorAll("input");
  expect(inputs).toHaveLength(2);

  const button = container.querySelectorAll("button");
  expect(button).toHaveLength(1);

  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /ok/i })).toBeInTheDocument();
});

test("inputs elements get focused whenever the related label is clicked", async () => {
  const user = userEvent.setup();
  render(<Login />);
  const emailInput = screen.getByLabelText(/email/i);

  await user.click(emailInput);
  expect(emailInput).toHaveFocus();

  const passwordInput = screen.getByLabelText(/password/i);

  await user.click(passwordInput);
  expect(passwordInput).toHaveFocus();
});

test("render the submit button when is disabled by default", () => {
  render(<Login />);
  const buttonsub = screen.getByRole("button", { name: /ok/i });
  expect(buttonsub).toBeDisabled();
});

test("render button becomes enabled after walid email and password", async () => {
  render(<Login />);
  const inEmail = screen.getByLabelText(/email/i);
  const inPassword = screen.getByLabelText(/password/i)
  const buttonsub = screen.getByRole("button", { name: /ok/i });

  expect(buttonsub).toBeDisabled()

  await userEvent.type(inEmail, "testutilisateur@gmail.com")
  await userEvent.type(inPassword, "mdp19203")
  expect(buttonsub).toBeEnabled()
});

test("render the logIn props when is called with email and passwrod", async () => {
  const logMock = jest.fn();
  render(<Login logIn={logMock}/>)
  const inEmail = screen.getByLabelText(/email/i);
  const inPassword = screen.getByLabelText(/password/i)
  const buttonsub = screen.getByRole("button", { name: /ok/i });

  await userEvent.type(inEmail, "testutilisateur@gmail.com")
  await userEvent.type(inPassword, "mdp19203")
  await userEvent.click(buttonsub);

  expect(logMock).toHaveBeenCalledWith("testutilisateur@gmail.com", "mdp19203");
})