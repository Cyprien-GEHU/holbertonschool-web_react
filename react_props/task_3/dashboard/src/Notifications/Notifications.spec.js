import { render, screen, fireEvent } from "@testing-library/react";
import Notifications from "./Notifications";
import { expect, test, jest } from "@jest/globals";
import { getLatestNotification } from "../utils/utils";

const notificationsList = [
  { id: 1, type: "default", value: "New course available" },
  { id: 2, type: "urgent", value: "New resume available" },
  { id: 3, type: "urgent", html: getLatestNotification() },
];

test("render the title", () => {
  render(<Notifications />);

  expect(screen.getByText(/Here is the list of notifications/i));
});

test("render the notification button", () => {
  render(<Notifications notifications={notificationsList} />);

  expect(screen.getByLabelText(/close/i));
});


test("render reading the click on the button", () => {
  const logSpy = jest.spyOn(console, "log");
  render(<Notifications />);

  fireEvent.click(screen.getByLabelText(/close/i));
  expect(logSpy).toHaveBeenCalledWith(
    expect.stringMatching(/Close button has been clicked/i),
  );
});

test("render without crashing no nofication", () => {
  render(<Notifications notifications={[]} />)
  expect(screen.getByText(/Here is the list of notifications/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/close/i)).toBeInTheDocument();
  expect(screen.queryAllByRole('listitem')).toHaveLength(0);
})

test("render all notification items", () => {
  render(<Notifications notifications={notificationsList} />);
  const items = screen.getAllByRole('listitem');

  expect(items).toHaveLength(3);

  expect(items[0]).toHaveTextContent('New course available');
  expect(items[0]).toHaveAttribute('data-notification-type', 'default');
  expect(items[0]).toHaveStyle({"color": 'blue'});

  expect(items[1]).toHaveTextContent('New resume available');
  expect(items[1]).toHaveAttribute('data-notification-type', 'urgent');
  expect(items[1]).toHaveStyle({"color": 'red'});

  expect(items[2]).toHaveTextContent('Urgent requirement - complete by EOD');
  expect(items[2]).toHaveAttribute('data-notification-type', 'urgent');
  expect(items[2]).toHaveStyle({"color": 'red'});

  const elementStr = items[2].querySelector('strong');
  expect(elementStr).toBeInTheDocument();
  expect(elementStr).toHaveTextContent('Urgent requirement')
})
