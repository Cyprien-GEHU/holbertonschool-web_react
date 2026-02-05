import "./Notifications.css";
import closeButton from "../assets/close-button.png";
import NotificationItem from "./NotificationItem";

function Notifications({ notifications = [] , displayDrawer = false}) {
  function closeClick() {
    console.log("Close button has been clicked");
  }
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
                    type={notification.type}
                    value={notification.value}
                    html={notification.html}
                  />
                ))}
              </ul>
            </>
          )}

          <button aria-label="Close" onClick={closeClick}>
            <img src={closeButton} alt="close button" />
          </button>
        </div>
      )}
    </div>
  );
}

export default Notifications;
