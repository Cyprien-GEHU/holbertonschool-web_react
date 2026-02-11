import { render, screen } from "@testing-library/react";
import BodySection from "./BodySection";

describe("test all part bodysection", () => {
  test("Render the heading with title prop value", () => {
    render(<BodySection title="this is a title" />);
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "this is a title",
    );
  });

  test("Render any number of children", () => {
    const children = [
      <p key="1">first</p>,
      <p key="2">second</p>,
      <p key="3">third</p>,
    ];
    render(<BodySection title="this is a title">{children}</BodySection>);
    expect(screen.getByText(/first/i)).toBeInTheDocument();
    expect(screen.getByText(/second/i)).toBeInTheDocument();
    expect(screen.getByText(/third/i)).toBeInTheDocument();
    expect(screen.getAllByText(/first|second|third/i)).toHaveLength(3);
  });
});
