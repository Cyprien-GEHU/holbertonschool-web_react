import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe("Header part", () => {
  test("render header without crash", () => {
    render(<Header />);
    const header = screen.getByText(/school dashboard/i);
    expect(header).toBeInTheDocument();
  });

  test("render the title of the web site", () => {
    render(<Header />);
    expect(screen.getByRole("heading")).toHaveTextContent(/School dashboard/i);
  });

  test("render the holberton logo", () => {
    render(<Header />);
    expect(screen.getByAltText(/holberton logo/i)).toBeInTheDocument();
  });
});
