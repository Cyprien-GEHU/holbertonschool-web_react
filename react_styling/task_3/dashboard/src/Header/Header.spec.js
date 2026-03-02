import { render, screen } from '@testing-library/react'
import Header from './Header'

test('renders the Holberton logo in the header component ', () => {
    render(<Header />)
    expect(screen.getByAltText(/^holberton logo$/i)).toBeInTheDocument()
})

test('renders the h1 element with correct text', () => {
    render(<Header />)
    expect(screen.getByRole('heading', {level: 1, name: /^school dashboard$/i})).toBeInTheDocument()
})