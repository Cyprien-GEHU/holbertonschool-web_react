// import {expect, test} from '@jest/globals'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App.jsx'

test('should render title', () => {
  render(<App />)

  const title = screen.getByRole('heading', {level: 1})
  expect(title).toBeInTheDocument()
  expect(title).toHaveTextContent(/School dashboard/i)
})

test('should render two paragraphs', () => {
  render(<App />)

  expect(screen.getByText(/Login to access the full dashboard/i))
  expect(screen.getByText(/Copyright 2026 - holberton School/i))
})

test('should render the image', () => {
  render(<App />)

  expect(screen.getByAltText(/holberton logo/i)).toBeInTheDocument()
})

test('should render two inputs for login', () => {
  render(<App />)

  const inputs = screen.getAllByRole('textbox')
  const password = screen.getByLabelText(/password/i)

  expect(password)
  expect(inputs.length + 1).toBe(2)
})

test('should render two label elements', () => {
  render(<App />)

  const labels = screen.getAllByText(/email|password/i)

  expect(labels).toHaveLength(2)
})

test('should render one button', () => {
  render(<App />)

  expect(screen.getByText(/ok/i))
})

// Implement functionnality to toggle rendering based on isLoggedIn
test('should render Login form when isLoggedIn is false', () => {
  render(<App isLoggedIn={false} />)

  expect(screen.getByText(/Login/i))
})

test('should render CourseList table when isLoggedIn is true', () => {
  render(<App isLoggedIn={true} />)

  const table = screen.getByRole('table')

  expect(table.id).toBe('CourseList')
})

// Clean up
afterEach(() => {
  jest.restoreAllMocks()
})

test('should call once the logOut function after shortcut', async () => {
  jest.spyOn(window, 'alert').mockImplementation(() => {})
  const mockProp = jest.fn()
  const user = userEvent.setup()

  render(<App isLoggedIn={false} logOut={mockProp} />)

  await user.keyboard('{Control>}{h}{/Control}')

  expect(mockProp.mock.calls).toHaveLength(1)
})

test('should called the alert function with correct text', async () => {
  const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {})
  const user = userEvent.setup()
  const noop = () => {}

  render(<App isLoggedIn={false} logOut={noop} />)

  await user.keyboard('{Control>}{h}{/Control}')

  expect(alertSpy).toHaveBeenCalledWith(
    expect.stringMatching(/Logging you out/i)
  )
})

test('should display by default body content', () => {
  render(<App />)

  const paragraph = screen.getByText(/Holberton School News goes here/i)
  const title = screen.getByText(/News from the School/i)

  expect(paragraph).toBeInTheDocument()
  expect(paragraph).toHaveRole('paragraph')
  expect(title).toBeInTheDocument()
  expect(title).toHaveRole('heading')
})