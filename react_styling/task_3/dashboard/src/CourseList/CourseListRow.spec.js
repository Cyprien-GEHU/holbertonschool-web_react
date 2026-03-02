import { render, screen, within } from '@testing-library/react'
import CourseListRow from './CourseListRow'

test("renders one column header with attribute colspan  = 2 when prop isHeader is true and textSecondCell is null", () => {
    render(<table><tbody><CourseListRow isHeader={true} textSecondCell={null}/></tbody></table>)

    expect(screen.getAllByRole('columnheader')).toHaveLength(1)
    expect(screen.getByRole('columnheader')).toHaveAttribute('colspan', '2')
})

test("renders 2 <th> cells when prop isHeader is true and textSecondCell is not null", () => {
    render(<table><tbody><CourseListRow isHeader={true} textSecondCell={""}/></tbody></table>)

    expect(screen.getAllByRole('columnheader')).toHaveLength(2)
})

test("renders 2 <td> cells within a tr element when prop isHeader is false", () => {
    render(<table><tbody><CourseListRow isHeader={false}/></tbody></table>)

    const tr = screen.getByRole('row')
    expect(tr).toBeInTheDocument()
    expect(within(tr).getAllByRole('cell')).toHaveLength(2)
})