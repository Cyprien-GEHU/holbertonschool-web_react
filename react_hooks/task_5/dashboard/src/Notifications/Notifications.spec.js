import { render, screen, fireEvent } from '@testing-library/react'
import Notifications from './Notifications'
import { getLatestNotification } from '../utils/utils'
import NotificationItem from './NotificationItem'

const mockNotificationsList = [
        { id: 1, type: "default", value: "New course available" },
        { id: 2, type: "urgent", value: "New resume available" },
        { id: 3, type: "urgent", html: { __html: getLatestNotification() } },
    ]

const mockNotificationsList1 = [
        { id: 1, type: "default", value: "New course available" },
        { id: 2, type: "urgent", value: "New resume available" },
    ]

const mockNotificationsList2 = [
        { id: 1, type: "default", value: "New curriculum available" },
        { id: 2, type: "urgent", value: "New cover letter available" },
    ]

    const mockNotificationsList3 = [
        { id: 1, type: "default", value: "New course available" },
    ]

let consoleSpy

beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation()
})

afterEach(() => {
    consoleSpy.mockRestore()
})
test('Renders the notifications title', () => {
    render(<Notifications notifications={mockNotificationsList} displayDrawer={true}/>)
    expect(screen.getByText(/^here is the list of notifications$/i)).toBeInTheDocument()
})

test('Renders a button in the notifications', () => {
    render(<Notifications displayDrawer={true} notifications={mockNotificationsList}/>)
    expect(screen.getByRole('button', { name: /^close$/i})).toBeInTheDocument()
})

test('Renders exactly 3 li elements', () => {
    render(<Notifications notifications={mockNotificationsList} displayDrawer={true}/>)
    expect(screen.getAllByRole('listitem').length).toBe(3)
})

test('Clicking the close button logs Close button has been clicked to the console', () => {
    const HHDM = jest.fn();
    render(<Notifications displayDrawer={true} notifications={mockNotificationsList} handleHideDrawer={HHDM}/>)
    fireEvent.click(screen.getByRole('button', { name: /^close$/i}))
    expect(HHDM).toHaveBeenCalledTimes(1);
})

test('Only renders the notification-title when displayDrawer is false', () => {
    render(<Notifications displayDrawer={false} />)
    expect(screen.getByText(/your notifications/i)).toBeInTheDocument()

    expect(screen.queryByText(/^here is the list of notifications$/i)).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /^close$/i})).not.toBeInTheDocument()
})

test('Renders p element, button and notifications item when displayDrawer is true', () => {
    render(<Notifications notifications={mockNotificationsList} displayDrawer={true} />)

    expect(screen.getByText(/^here is the list of notifications$/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /^close$/i})).toBeInTheDocument()
    expect(screen.getAllByRole('listitem').length).toBe(3)
})


test('render the list of notifiction when we click on notification title', () => {
    HDD = jest.fn();
    render(<Notifications notifications={mockNotificationsList2} displayDrawer={false} handleDisplayDrawer={HDD}/>)
    fireEvent.click(screen.getByText(/Your notifications/i))
    expect(HDD).toHaveBeenCalledTimes(1)
})