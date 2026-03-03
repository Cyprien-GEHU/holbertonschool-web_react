import { render, screen } from '@testing-library/react'
import BodySectionWithMarginBottom from './BodySectionWithMarginBottom'

test('BodySectionWithMarginBottom component contains a div with the class bodySectionWithMargin', () => {
    const  {container } = render(<BodySectionWithMarginBottom title="test">
        <p>test</p>
        </BodySectionWithMarginBottom>
    )

    const divWithBodySectionClass = container.querySelector('.bodySectionWithMargin')
    expect(divWithBodySectionClass).toBeInTheDocument()
})

test('BodySectionWithMarginBottom component renders the BodySection component', () => {
    render(
        <BodySectionWithMarginBottom title="test title">
            <p>test paragraph</p>
        </BodySectionWithMarginBottom>
    )
    
    expect(screen.getByRole('heading', { level: 2, name: /test title/i })).toBeInTheDocument()
    expect(screen.getByText(/test paragraph/i)).toBeInTheDocument()
})