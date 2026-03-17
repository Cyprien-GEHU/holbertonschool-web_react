import { configureStore } from "@reduxjs/toolkit";
import mockAxios from "jest-mock-axios";
import axios from "axios";
import notificationsReducer, {
  fetchNotifications,
  markNotificationAsRead,
  showDrawer,
  hideDrawer,
} from "../notifications/notificationsSlice";
import { getLatestNotification } from "../../utils/utils";

afterEach(() => {
  mockAxios.reset();
});

describe("all test for notificationsSlice", () => {
  const initialState = {
    notifications: [],
    displayDrawer: true,
  };

  it("render the correct initial state by default", () => {
    expect(notificationsReducer(undefined, { type: "unknown" })).toEqual(
      initialState,
    );
  });

  it("render the fetches notifications data correctly", async () => {
    const mockNotif = [
      { id: 1, type: "default", value: "New course available" },
      { id: 2, type: "urgent", value: "New resume available" },
      { id: 3, type: "urgent", html: { __html: getLatestNotification() } },
    ];

    const store = configureStore({ reducer: notificationsReducer });
    const promise = store.dispatch(fetchNotifications());

    mockAxios.mockResponse({ data: { notifications: mockNotif } });

    await promise;

    const stateStore = store.getState();
    expect(stateStore.notifications).toHaveLength(3);
    expect(stateStore.notifications[0]).toEqual(mockNotif[0]);
    expect(stateStore.notifications[1]).toEqual(mockNotif[1]);
    expect(stateStore.notifications[2]).toEqual({
      ...mockNotif[2],
      html: { __html: getLatestNotification() },
    });
  });

  it("render notification correctly when the markNotificationAsRead action is dispatched", () => {
    const notif = {
      ...initialState,
      notifications: [
        { id: 1, type: "default", value: "New course available" },
        { id: 2, type: "urgent", value: "New resume available" },
        { id: 3, type: "urgent", html: { __html: getLatestNotification() } },
      ],
    };

    const nofifState = notificationsReducer(notif, markNotificationAsRead(2));

    expect(nofifState.notifications).toHaveLength(2);
    expect(
      nofifState.notifications.find((data) => data.id === 2),
    ).toBeUndefined();
  });

  it("render the Toggles the displayDrawer state correctly when the showDrawer and hideDrawer actions are dispatched", () => {
    const stateDrawer = { ...initialState, displayDrawer: true };

    const stateHidden = notificationsReducer(stateDrawer, hideDrawer());
    expect(stateHidden.displayDrawer).toBe(false);

    const stateAct = notificationsReducer(stateDrawer, showDrawer());
    expect(stateAct.displayDrawer).toBe(true);
  });
});
