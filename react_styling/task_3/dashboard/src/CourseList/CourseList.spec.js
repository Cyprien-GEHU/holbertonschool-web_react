import { render, screen } from '@testing-library/react'
import CourseList from './CourseList'

let consoleSpy

beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation()
})

afterEach(() => {
    consoleSpy.mockRestore()
})

test('renders 5 different rows when it receive an array of courses objects', () => {
    const coursesListTestExample = [
        {id: 1, name: "PHP", credit: 60},
        {id: 2, name: "Symfony", credit: 40},
        {id: 3, name: "Sylius", credit: 20}
    ]
    render(<CourseList courses={coursesListTestExample}/>)
    expect(screen.getAllByRole('row')).toHaveLength(5)
})

test('renders 1 row when receiving an empty array', () => {
    render(<CourseList courses={[]}/>)
    expect(screen.getAllByRole('row')).toHaveLength(1)
})