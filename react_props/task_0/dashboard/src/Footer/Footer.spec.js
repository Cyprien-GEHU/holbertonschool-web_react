import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer part", () => {
  test("render footer without crash", () => {
    render(<Footer />);
    const footerText = screen.getByText(/Copyright 2026 - holberton School/i);
    expect(footerText).toBeInTheDocument();
  });
});
