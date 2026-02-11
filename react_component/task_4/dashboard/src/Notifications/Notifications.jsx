import "./Notifications.css";
import closeButton from "../assets/close-button.png";
import NotificationItem from "./NotificationItem";
import { Component } from "react";

class Notifications extends Component {
  static defaultProps = {
    notifications: [],
    displayDrawer: false,
  };

  closeClick = () => {
    console.log("Close button has been clicked");
  };

  markAsRead = (id) => {
    console.log(`Notification ${id} has been marked as read`);
  };

  render() {
    const { notifications, displayDrawer } = this.props;
    return (
      <div className="root-notifications">
        <div className="notification-title">
          <p>Your notifications</p>
        </div>

        {displayDrawer && (
          <div className="notification-items">
            {notifications.length === 0 ? (
              <p>No new notification for now</p>
            ) : (
              <>
                <p>Here is the list of notifications</p>
                <ul>
                  {notifications.map((notification) => (
                    <NotificationItem
                      key={notification.id}
                      id={notification.id}
                      type={notification.type}
                      value={notification.value}
                      html={notification.html}
                      markAsRead={this.markAsRead}
                    />
                  ))}
                </ul>
              </>
            )}

            <button aria-label="Close" onClick={this.closeClick}>
              <img src={closeButton} alt="close button" />
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default Notifications;
