// import {expect, test, jest} from '@jest/globals'
import {render, fireEvent, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import Notifications from './Notifications.jsx'

test('blob', () => {
  const notificationsList = [
    { id: 1, type: 'default', value: 'New course available' }
  ]
  const logSpy = jest.spyOn(console, 'log')
  render(<Notifications notifications={notificationsList}  displayDrawer={true} />)

  fireEvent.click(screen.getByLabelText(/close/i))

  expect(logSpy).toHaveBeenCalledWith(
    expect.stringMatching(/Close button has been clicked/i)
  )
})

test('should render the 3 li elements', () => {
  const notificationsList = [{
    id: 1,
    type: 'default',
    value: 'New course available'
  }, {
    id: 2,
    type: 'urgent',
    value: 'New course available'
  }, {
    id: 3,
    type: 'urgent',
    html: { __html: '<div>Hello world</div>' }
  }]
  render(<Notifications notifications={notificationsList} displayDrawer={true} />)

  expect(screen.getAllByRole('listitem').length).toBe(3)
})

test('should not render notification when displayDrawer is false', () => {
  render(<Notifications notifications={[]} displayDrawer={false} />)

  expect(screen.getByText(/Your Notifications/i)).toBeInTheDocument()
  expect(screen.queryByLabelText(/close/i)).not.toBeInTheDocument()
  expect(screen.queryByText(
    /Here is the list of notifications/i
  )).not.toBeInTheDocument()
  expect(screen.queryByRole('listitem')).not.toBeInTheDocument()
})

test('should render notifications when displayDrawer is true', () => {
  const notificationsList = [{
    id: 1,
    type: 'default',
    value: 'New course available'
  }, {
    id: 2,
    type: 'urgent',
    value: 'New course available'
  }, {
    id: 3,
    type: 'urgent',
    html: { __html: '<div>Hello world</div>' }
  }]
  render(<Notifications notifications={notificationsList} displayDrawer={true} />)

  expect(screen.getByText(/Your Notifications/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/close/i)).toBeInTheDocument()
  expect(screen.getByText(
    /Here is the list of notifications/i
  )).toBeInTheDocument()
  expect(screen.getAllByRole('listitem')[0]).toBeInTheDocument()
  expect(screen.getAllByRole('listitem')[1]).toBeInTheDocument()
  expect(screen.getAllByRole('listitem')[2]).toBeInTheDocument()
})

test('should render notifications when displayDrawer is true and empty notifications', () => {
  const notificationsList = []
  render(<Notifications notifications={notificationsList} displayDrawer={true} />)

  expect(screen.getByText(/Your Notifications/i)).toBeInTheDocument()
  expect(screen.getByText(
    /No new notification for now/i
  )).toBeInTheDocument()
})

// Clean up
afterEach(() => {
  jest.restoreAllMocks()
})

test('should display correct log message when notification is clicked', async () => {
  const logSpy = jest.spyOn(console, 'log') 
  const notificationsList = [{
    id: 1,
    type: 'default',
    value: 'New training available'
  }, {
    id: 2,
    type: 'urgent',
    value: 'New course available'
  }, {
    id: 3,
    type: 'urgent',
    html: { __html: '<div>Hello world</div>' }
  }]
 
  render(<Notifications notifications={notificationsList} displayDrawer={true} />)

  const user = userEvent.setup()

  const notificationItem = screen.getByText(/New course available/i)
  await user.click(notificationItem)

  expect(logSpy).toHaveBeenCalledWith(
    expect.stringMatching(/Notification 2 has been marked as read/i)
  )
})

test('should not re-render when length of notification is the same', () => {
  let notificationsList = [{
    id: 1,
    type: 'default',
    value: 'New training available'
  }, {
    id: 2,
    type: 'urgent',
    value: 'New course available'
  }]

  const { rerender } = render(
    <Notifications notifications={notificationsList} displayDrawer={true} />
  )
  expect(screen.getAllByRole('listitem').length).toBe(2)
  expect(screen.getByText(/New training available/i)).toBeInTheDocument()
  expect(screen.getByText(/New course available/i)).toBeInTheDocument()

  notificationsList = [{
    id: 1,
    type: 'urgent',
    value: 'New video available'
  }, {
    id: 2,
    type: 'urgent',
    value: 'New podcast available'
  }]

  rerender(
    <Notifications notifications={notificationsList} displayDrawer={true} />
  )
  expect(screen.getAllByRole('listitem').length).toBe(2)
  expect(screen.getByText(/New training available/i)).toBeInTheDocument()
  expect(screen.getByText(/New course available/i)).toBeInTheDocument()
  expect(screen.queryByText(/New video available/i)).not.toBeInTheDocument()
  expect(screen.queryByText(/New podcast available/i)).not.toBeInTheDocument()
})

test('should re-render when length of notification is not the same', () => {
  let notificationsList = [{
    id: 1,
    type: 'default',
    value: 'New training available'
  }]

  const { rerender } = render(
    <Notifications notifications={notificationsList} displayDrawer={true} />
  )
  expect(screen.getAllByRole('listitem').length).toBe(1)
  expect(screen.getByText(/New training available/i)).toBeInTheDocument()

  notificationsList = [{
    id: 1,
    type: 'urgent',
    value: 'New video available'
  }, {
    id: 2,
    type: 'urgent',
    value: 'New podcast available'
  }]

  rerender(
    <Notifications notifications={notificationsList} displayDrawer={true} />
  )
  expect(screen.getAllByRole('listitem').length).toBe(2)
  expect(screen.getByText(/New video available/i)).toBeInTheDocument()
  expect(screen.getByText(/New podcast available/i)).toBeInTheDocument()
  expect(screen.queryByText(/New training available/i)).not.toBeInTheDocument()
})