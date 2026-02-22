import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import Notifications from "./Notifications";
import { expect, test, jest, describe, afterEach } from "@jest/globals";
import { getLatestNotification } from "../utils/utils";

const notificationsList = [
  { id: 1, type: "default", value: "New course available" },
  { id: 2, type: "urgent", value: "New resume available" },
  { id: 3, type: "urgent", html: getLatestNotification() },
];

afterEach(() => {
  cleanup
})

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

describe("test all console log return when display owner is true and when we have notification content", () => {
  test("render a message log when the close is use", () => {
    const spyConsoleLog = jest.spyOn(console, "log");
    render(
      <Notifications notifications={notificationsList} displayDrawer={true} />,
    );
    fireEvent.click(screen.getByLabelText(/close/i));
    expect(spyConsoleLog).toHaveBeenCalledWith(
      expect.stringMatching(/Close button has been clicked/i),
    );
    spyConsoleLog.mockRestore();
  });

  test("render the correct message when notification item is clicked", () => {
    const spyConsoleLog = jest.spyOn(console, "log").mockImplementation(() => {});
    render(
      <Notifications notifications={notificationsList} displayDrawer={true} />,
    );
    const element = screen.getAllByRole('listitem');
    fireEvent.click(element[0]);
    expect(spyConsoleLog).toHaveBeenCalledWith('Notification 1 has been marked as read');
    spyConsoleLog.mockRestore();
  })
});

describe("all test re-reder with purecomponent", () => {
  test(" render the component when compenant doesn't have a re-render", () => {
    const {rerender} = render (<Notifications displayDrawer={true} notifications={notificationsList} />);
    const spyRender = jest.spyOn(Notifications.prototype, 'render');
    rerender(<Notifications displayDrawer={true} notifications={notificationsList} />);
    expect(spyRender).not.toHaveBeenCalled();
    spyRender.mockRestore();
  })

  test("render the length of the notification when props change", () => {
    const {rerender} = render (<Notifications displayDrawer={true} notifications={notificationsList} />);
    const spyRender = jest.spyOn(Notifications.prototype, 'render');
    const newList = [{ id: 192, type: 'default', value:"a new list !"}];
    rerender(<Notifications displayDrawer={true} notifications={newList} />);
    expect(spyRender).toHaveBeenCalled();
    spyRender.mockRestore();
  })
})