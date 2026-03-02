import React from 'react'
import NotificationItem from './NotificationItem'
import closeButton from '../assets/close-button.png'

class Notifications extends React.Component {
    shouldComponentUpdate(nextProps) {
        if (nextProps.notifications.length !== this.props.notifications.length) {
            return true
        }
        return false
    }
    markAsRead(id) {
        console.log(`Notification ${id} has been marked as read`)
    }

    render() {
        const { displayDrawer = false, notifications = [] } = this.props
        return (
            <>
                <div className="notification-title absolute right-3 top-1">Your notifications</div>
                {displayDrawer && (
                    <div className="notification-items relative border-[3px] border-dotted border-[color:var(--main-color)] p-1.5 w-1/4 float-right mt-7">
                        {notifications.length === 0 ? (
                            <p>No new notification for now</p>
                        ) : (
                            <>
                                <div className="relative">
                                    <p className='m-0'>Here is the list of notifications</p>
                                    <button className="absolute cursor-pointer right-0 top-0 bg-transparent"
                                        onClick={() => console.log("Close button has been clicked")}
                                        aria-label='Close'>
                                        <img src={closeButton} alt="close-button" className="w-3 h-3" />
                                    </button>
                                    <ul className='list-[square] pl-5'>
                                        {notifications.map((notification) => (
                                            <NotificationItem
                                                key={notification.id}
                                                type={notification.type}
                                                value={notification.value}
                                                html={notification.html}
                                                markAsRead={this.markAsRead}
                                                id={notification.id}
                                            />
                                        ))}
                                    </ul>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </>
        )
    }
}
export default Notifications