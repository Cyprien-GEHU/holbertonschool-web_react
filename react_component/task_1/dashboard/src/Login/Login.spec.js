import { render, screen } from "@testing-library/react";
import Login from "./Login";
import userEvent from "@testing-library/user-event";

describe("Login part", () => {
  test("render login without crash", () => {
    render(<Login />);
    const text = screen.getByText(/Login to access the full dashboard/i);
    expect(text).toBeInTheDocument();
  });

  test("render two input for login", () => {
    render(<Login />);
    const inp = screen.getAllByRole("textbox");
    const password = screen.getByLabelText(/password/i);

    expect(inp.length + 1).toBe(2);
    expect(password).toBeInTheDocument();
  });

  test("return all label for login", () => {
    render(<Login />);
    const lab = screen.getAllByText(/email|password/i);
    expect(lab).toHaveLength(2);
  });

  test("render the button OK", () => {
    render(<Login />);

    expect(screen.getByRole("button", { name: /ok/i })).toBeInTheDocument();
  });

  test("render label focus on the input", async () => {
    render(<Login />);
    const inputEmail = screen.getByLabelText(/email/i);
    const inputPassword = screen.getByLabelText(/password/i);
    const labelEmail = screen.getByText(/email/i);
    const labelPassword = screen.getByText(/password/i);
    await userEvent.click(labelEmail);
    expect(inputEmail).toHaveFocus();
    await userEvent.click(labelPassword);
    expect(inputPassword).toHaveFocus();
  });
});
