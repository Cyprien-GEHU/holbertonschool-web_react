import { render, screen } from '@testing-library/react'
import Footer from './Footer'
import { getFooterCopy, getCurrentYear } from '../utils/utils'

test('renders a p element string Copyright {the current year} - Holberton School, whenever the getFooterCopy() “isIndex” argument is set to true', () => {
    render(<Footer isIndex={true}/>)

    const currentYear = getCurrentYear()
    const footerCopy = getFooterCopy(true)
    expect(screen.getByText(new RegExp(`copyright ${currentYear} - ${footerCopy}`, 'i'))).toBeInTheDocument()
})