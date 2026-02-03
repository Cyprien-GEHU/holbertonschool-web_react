import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe("Header part", () => {
  test("render header without crash", () => {
    render(<Header />);
    const header = screen.getByText(/school dashboard/i);
    expect(header).toBeInTheDocument();
  });
});
