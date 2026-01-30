import { render, screen, fireEvent } from "@testing-library/react";
import Notifications from "./Notifications";
import { expect, test, jest } from "@jest/globals";

test("render the title", () => {
  render(<Notifications />);

  expect(screen.getByText(/Here is the list of notifications/i));
});

test("render the notification button", () => {
  render(<Notifications />);

  expect(screen.getByLabelText(/close/i));
});

test("rend all li elements", () => {
  render(<Notifications />);
  expect(screen.getAllByRole("listitem").length).toBe(3);
});

test("render reading the click on the button", () => {
  const logSpy = jest.spyOn(console, "log");
  render(<Notifications />);

  fireEvent.click(screen.getByLabelText(/close/i));
  expect(logSpy).toHaveBeenCalledWith(
    expect.stringMatching(/Close button has been clicked/i),
  );
});
