import { PureComponent } from "react";

class NotificationItem extends PureComponent {
  handleClick = () => {
    const { id, markAsRead } = this.props;
    if (markAsRead) {
      markAsRead(id);
    }
  };

  render() {
    const { type = null, html = null, value = null } = this.props;

    // Couleur basée sur le type de notification
    const textColor =
      type === "default"
        ? "text-[var(--default-notification-item)]"
        : "text-[var(--urgent-notification-item)]";

    if (html) {
      return (
        <li
          data-notification-type={type}
          className={`${textColor} p-[6px]`} // padding de 6px ajouté
          dangerouslySetInnerHTML={
            typeof html === "object" ? html : { __html: html }
          }
          onClick={this.handleClick}
        />
      );
    }

    return (
      <li
        data-notification-type={type}
        className={`${textColor} p-[6px]`} // padding de 6px ajouté
        onClick={this.handleClick}
      >
        {value}
      </li>
    );
  }
}

export default NotificationItem;