import { render, screen } from "@testing-library/react";
import Login from "./Login";

describe("Login part", () => {
  test("render login without crash", () => {
    render(<Login />);
    const text = screen.getByText(/Login to access the full dashboard/i);
    expect(text).toBeInTheDocument();
  });
});
