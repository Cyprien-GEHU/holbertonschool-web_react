import { createSelector } from "@reduxjs/toolkit";

const notifSelect = (state) => state.notifications.notifications;

const filterSelect = (_, filter) => filter;

export const getFilteredNotifications = createSelector(
  [notifSelect, filterSelect],
  (notifications, filter) => {
    if (filter === "all") {
      return notifications;
    }
    return notifications.filter((notif) => notif.type === filter);
  },
);
