import NotificationItem from "./NotificationItem";
import { render, screen, fireEvent } from "@testing-library/react";

describe("test all notification item with markAsRead", () => {
  let spyConsoleLog;
  beforeEach(() => {
    spyConsoleLog = jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    spyConsoleLog.mockRestore();
  });

  test("render markAsRead with the correct id when the notification have been clicked", () => {
    const jestMAR = jest.fn();
    const id = 192;
    render(
      <NotificationItem
        type="default"
        value="this is a try"
        id={id}
        markAsRead={jestMAR}
      />,
    );
    const li = screen.getByRole("listitem");
    fireEvent.click(li);
    expect(jestMAR).toHaveBeenCalledTimes(1);
    expect(jestMAR).toHaveBeenCalledWith(id);
  });

  test("render the correct console log when the nofication item is clicked", () => {
    const MAR = (id) =>
      console.log(`Notification ${id} has been marked as read`);
    render(
      <NotificationItem
        type="default"
        value="this is a new try again"
        id={192}
        markAsRead={MAR}
      />,
    );
    const li = screen.getByRole("listitem");
    fireEvent.click(li);
    expect(spyConsoleLog).toHaveBeenCalledWith(
      "Notification 192 has been marked as read",
    );
  });
});
