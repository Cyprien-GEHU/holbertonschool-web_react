import { render } from "@testing-library/react";
import BodySectionWithMarginBottom from "./BodySectionWithMarginBottom";

describe("all test on the body margin bottom part", () => {
  test("render the component contains a div with class bodySectionMargin", () => {
    const { container } = render(
      <BodySectionWithMarginBottom test="this is a test" />,
    );
    const div = container.querySelector(".bodySectionWithMargin");
    expect(div).toBeInTheDocument();
  });

  test("render the body section component", () => {
    const { container } = render(
      <BodySectionWithMarginBottom test="this is a test" />,
    );
    const divBody = container.querySelector(".bodySection");
    expect(divBody).toBeInTheDocument();
  });
});
