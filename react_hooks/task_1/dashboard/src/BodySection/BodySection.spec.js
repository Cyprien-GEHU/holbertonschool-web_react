import { render, screen } from '@testing-library/react'
import BodySection from './BodySection'

test('BodySection renders a heading with the title prop value', () => {
    render(<BodySection title="test" />)
    const testHeading = screen.getByRole('heading', {level: 2, name: /test/i})
    expect(testHeading).toBeInTheDocument()
})

test('BodySection renders any number of children passed to it ', () => {
    render(<BodySection children="
        <p>test paragraph</>
        <div>test div</>
        <span>test span</>
        <section>test section</>" />)
    expect(screen.getByText(/test paragraph/i)).toBeInTheDocument()
    expect(screen.getByText(/test div/i)).toBeInTheDocument()
    expect(screen.getByText(/test span/i)).toBeInTheDocument()
    expect(screen.getByText(/test section/i)).toBeInTheDocument()
})