import { render, screen, fireEvent } from "@testing-library/react";
import Notifications from "./Notifications";
import { expect, test, jest, describe } from "@jest/globals";
import { getLatestNotification } from "../utils/utils";

const notificationsList = [
  { id: 1, type: "default", value: "New course available" },
  { id: 2, type: "urgent", value: "New resume available" },
  { id: 3, type: "urgent", html: getLatestNotification() },
];

describe("Notification part when the display drawer is false", () => {
  test("render the title with displayDrawer", () => {
    render(
      <Notifications notifications={notificationsList} displayDrawer={false} />,
    );
    expect(screen.getByText(/Your notifications/i));
  });

  test("render not display the message : Here is the list of notifications ", () => {
    render(
      <Notifications notifications={notificationsList} displayDrawer={false} />,
    );
    expect(
      screen.queryByText(/Here is the list of notifications/i),
    ).not.toBeInTheDocument();
  });

  test("render not display item", () => {
    render(
      <Notifications notifications={notificationsList} displayDrawer={false} />,
    );
    expect(screen.queryAllByRole("listitem")).toHaveLength(0);
  });

  test("not render the notification button", () => {
    render(
      <Notifications notifications={notificationsList} displayDrawer={false} />,
    );
    expect(screen.queryByLabelText(/close/i)).not.toBeInTheDocument();
  });
});

describe("Notification part when the display drawer is true", () => {
  test("render reading the click on the button", () => {
    const logSpy = jest.spyOn(console, "log");
    render(
      <Notifications notifications={notificationsList} displayDrawer={true} />,
    );
    fireEvent.click(screen.getByLabelText(/close/i));
    expect(logSpy).toHaveBeenCalledWith(
      expect.stringMatching(/Close button has been clicked/i),
    );
  });

  test("render the close button", () => {
    render(
      <Notifications notifications={notificationsList} displayDrawer={true} />,
    );
    expect(screen.getByLabelText(/close/i)).toBeInTheDocument();
  });

  test("render the title with displayDrawer", () => {
    render(
      <Notifications notifications={notificationsList} displayDrawer={true} />,
    );
    expect(screen.getByText(/Your notifications/i));
  });

  test("render not display the message : Here is the list of notifications ", () => {
    render(
      <Notifications notifications={notificationsList} displayDrawer={true} />,
    );
    expect(
      screen.queryByText(/Here is the list of notifications/i),
    ).toBeInTheDocument();
  });

  test("render all notification items", () => {
    render(
      <Notifications notifications={notificationsList} displayDrawer={true} />,
    );
    const items = screen.getAllByRole("listitem");

    expect(items).toHaveLength(3);

    expect(items[0]).toHaveTextContent("New course available");
    expect(items[0]).toHaveAttribute("data-notification-type", "default");
    expect(items[0]).toHaveStyle({ color: "blue" });

    expect(items[1]).toHaveTextContent("New resume available");
    expect(items[1]).toHaveAttribute("data-notification-type", "urgent");
    expect(items[1]).toHaveStyle({ color: "red" });

    expect(items[2]).toHaveTextContent("Urgent requirement - complete by EOD");
    expect(items[2]).toHaveAttribute("data-notification-type", "urgent");
    expect(items[2]).toHaveStyle({ color: "red" });

    const elementStr = items[2].querySelector("strong");
    expect(elementStr).toBeInTheDocument();
    expect(elementStr).toHaveTextContent("Urgent requirement");
  });
});
describe(" Notification part when the displayDrawer is true and notification is empty", () => {
  test("render display a message", () => {
    render(<Notifications notifications={[]} displayDrawer={true} />);
    expect(screen.getByText(/Your notifications/i)).toBeInTheDocument();
  });

  test("render the message : No new notification for now", () => {
    render(<Notifications notifications={[]} displayDrawer={true} />);
    expect(
      screen.getByText(/No new notification for now/i),
    ).toBeInTheDocument();
  });

  test("render not display : Here is the list of notifications", () => {
    render(<Notifications notifications={[]} displayDrawer={true} />);
    expect(
      screen.queryByText(/Here is the list of notifications/i),
    ).not.toBeInTheDocument();
  });

  test("render not display item notification", () => {
    render(<Notifications notifications={[]} displayDrawer={true} />);
    expect(screen.queryAllByRole("listitem")).toHaveLength(0);
  });
});
