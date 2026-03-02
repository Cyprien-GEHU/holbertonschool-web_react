import { fireEvent, render, screen } from '@testing-library/react'
import App from './App.jsx'

let consoleSpy

beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation()
})

afterEach(() => {
    consoleSpy.mockRestore()
})

test('renders login and copyright paragraph with the correct content', async () => {
    render(<App isLoggedIn={false}/>)
    expect(screen.getByText(/^login to access the full dashboard$/i)).toBeInTheDocument()
    expect(screen.getByText(/^copyright/i)).toBeInTheDocument()   
})

test('renders Email and Password label element', async () => {
    render(<App isLoggedIn={false}/>)
    expect(screen.getByText(/^email:$/i)).toBeInTheDocument()
    expect(screen.getByText(/^password:$/i)).toBeInTheDocument()
})

test('renders the Login component when isLoggedIn is false', () => {
    render(<App isLoggedIn={false} />)
    expect(screen.getByText(/^login to access the full dashboard$/i)).toBeInTheDocument()
})

test('renders the CourseList component when isLoggedIn is true', () => {
    render(<App isLoggedIn={true} />)
    expect(screen.getByRole('table')).toBeInTheDocument()
})

test('verify that logOut is called once when ctrl+h are pressed', () => {
    const mockLogOut = jest.fn()
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation()

    render(<App logOut={mockLogOut}/>)

    fireEvent.keyDown(document, {key: 'h', ctrlKey: true})
    expect(mockLogOut).toHaveBeenCalledTimes(1)
    alertSpy.mockRestore()
})

test('checks that alert function is called with "Logging you out" message', () => {
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation()
    render(<App />)
    fireEvent.keyDown(document, {
        key: 'h',
        ctrlKey: true
    })
    expect(alertSpy).toHaveBeenCalledWith('Logging you out')
    alertSpy.mockRestore()
})

test('check that a title with the text News from the School, and a paragraph element with the text Holberton School News goes here are displayed by default in the App component', () => {
    render(<App />)
    const bodySectionTitle = screen.getByText(/news from the school/i)
    const bodySectionParagraph = screen.getByText(/holberton school news goes here/i)

    expect(bodySectionTitle).toBeInTheDocument()
    expect(bodySectionParagraph).toBeInTheDocument()
})