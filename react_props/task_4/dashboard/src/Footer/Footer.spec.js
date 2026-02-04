import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer part", () => {
  test("render footer without crash", () => {
    render(<Footer />);
    const footerText = screen.getByText(/Copyright 2026 - holberton School/i);
    expect(footerText).toBeInTheDocument();
  });

  test("render copyright and the current year", () => {
    render(<Footer />);
    const copyFooter = screen.getByText(/Copyright \d{4} - holberton School/i);
    expect(copyFooter).toBeInTheDocument();
  });
});
