import { PureComponent } from 'react'
import { getLatestNotification } from '../utils/utils'

class NotificationItem extends PureComponent {
    static defaultProps = {
        markAsRead: () => {},
        type: "default",
        html: "",
        value: "",
        id: 1
    }

    render() {
        const { markAsRead, type, html, value, id } = this.props
        const innerHtml = { __html: getLatestNotification() }
        if (type === "default")
            return (
                <li onClick={() => markAsRead(id)}
                    data-notification-type={type}
                    className="text-[color:var(--default-notification-item)] pl-1">
                    {value}
                </li>
            )
        else if (type === "urgent" && html) {
            return (
                <li
                    onClick={() => markAsRead(id)}
                    data-notification-type={type}
                    dangerouslySetInnerHTML={innerHtml}
                    className="text-[color:var(--urgent-notification-item)] pl-1">
                </li>
            )
        }
        else if (type === "urgent") {
            return (
                <li
                    onClick={() => markAsRead(id)}
                    data-notification-type={type}
                    className="text-[color:var(--urgent-notification-item)] pl-1"
                >
                    {value}
                </li>
            )
        }
    }
}
export default NotificationItem