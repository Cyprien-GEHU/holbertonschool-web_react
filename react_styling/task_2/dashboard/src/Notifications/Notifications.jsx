import closeButton from "../assets/close-button.png";
import NotificationItem from "./NotificationItem.jsx";
import { Component } from "react";

class Notifications extends Component {
  static defaultProps = {
    notifications: [],
    displayDrawer: false,
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.notifications.length !== this.props.notifications.length;
  }

  closeClick = () => {
    console.log("Close button has been clicked");
  };

  markAsRead = (id) => {
    console.log(`Notification ${id} has been marked as read`);
  };

  render() {
    const { notifications, displayDrawer } = this.props;
    return (
      <div className="w-full absolute flex flex-col items-end p-1.5">
        <div className="notification-title">
          <p className="m-0 mb-1.5 text-right">Your notifications</p>
        </div>

        {displayDrawer && (
          <div className="w-1/4 border-2 border-dashed border-(--main-color) p-[6px]">
            {notifications.length === 0 ? (
              <p>No new notification for now</p>
            ) : (
              <>
                <p>Here is the list of notifications</p>
                <ul className="list-disc pl-4">
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

            <button
            className="w-2 h-2 border-0 bg-transparent absolute top-12 right-[1.2rem]" 
            aria-label="Close" onClick={this.closeClick}>
              <img src={closeButton} alt="close button" />
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default Notifications;
