import CourseList from "./CourseList";
import { render, screen } from "@testing-library/react";

describe("CourseList test", () => {
  test("render 5 row different when have recive a array", () => {
    const courses = [
      { id: 1, name: "ES6", credit: 60 },
      { id: 2, name: "Webpack", credit: 20 },
      { id: 3, name: "React", credit: 40 },
    ];
    render(<CourseList courses={courses} />);
    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(5);
  });

  test("when have empty array, render one row", () => {
    render(<CourseList courses={[]} />);
    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(1);
    expect(screen.getByText(/No course available yet/i)).toBeInTheDocument();
  });
});
