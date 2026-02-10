import CourseListRow from "./CourseListRow";
import { render, screen } from "@testing-library/react";

describe("all test for course list row", () => {
  test("when header is true and textsecond is null, render th with colspan=2", () => {
    render(
      <table>
        <tbody>
          <CourseListRow isHeader={true} textSecondCell={null} />
        </tbody>
      </table>
    );
    const head = screen.getAllByRole("columnheader");
    expect(head).toHaveLength(1);
    expect(head[0]).toHaveAttribute("colspan", "2");
  });

  test("when header is true and textsecond is not null render twh th", () => {
    render(
      <table>
        <tbody>
          <CourseListRow
            isHeader={true}
            textFirstCell="Course"
            textSecondCell="Credit"
          />
        </tbody>
      </table>
    );
    const head = screen.getAllByRole("columnheader");
    expect(head).toHaveLength(2);
  });

  test("when header is false render 2 td with tr", () => {
    render(
      <table>
        <tbody>
          <CourseListRow
            isHeader={false}
          />
        </tbody>
      </table>
    );
    const row = screen.getByRole("row");
    expect(row).toBeInTheDocument();
    const cell = screen.getAllByRole("cell");
    expect(cell).toHaveLength(2);
  });
});
