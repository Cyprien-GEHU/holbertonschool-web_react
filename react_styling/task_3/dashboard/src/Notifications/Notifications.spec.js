import { render, screen, fireEvent } from '@testing-library/react'
import Notifications from './Notifications'
import { getLatestNotification } from '../utils/utils'

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
    render(<Notifications displayDrawer={true} notifications={mockNotificationsList}/>)
    fireEvent.click(screen.getByRole('button', { name: /^close$/i}))
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringMatching(/^close button has been clicked$/i))
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

test('when simulating a click on a notification item, logs to the console the correct string', () => {
    render(<Notifications notifications={mockNotificationsList} displayDrawer={true} />)
    const liItem = screen.getByText(/new course available/i)

    fireEvent.click(liItem)
    expect(consoleSpy).toHaveBeenCalledWith("Notification 1 has been marked as read")
})

test('Doesn\'t re-render the Notifications component when notifications prop length remains the same', () => {
    const { rerender } = render(<Notifications notifications={mockNotificationsList1} displayDrawer={true} />)

    const renderSpy = jest.spyOn(Notifications.prototype, 'render')

    rerender(<Notifications notifications={mockNotificationsList2} displayDrawer={true} />)

    expect(renderSpy).not.toHaveBeenCalled()

    renderSpy.mockRestore()
})

test('Does re-render the Notifications component when notifications prop length changes', () => {
    const { rerender } = render(<Notifications notifications={mockNotificationsList3} displayDrawer={true} />)

    const renderSpy = jest.spyOn(Notifications.prototype, 'render')

    rerender(<Notifications notifications={mockNotificationsList2} displayDrawer={true} />)

    expect(renderSpy).toHaveBeenCalled()

    renderSpy.mockRestore()
})