import React from 'react';
import CourseListRow from "./CourseListRow";
import WithLogging from '../HOC/WithLogging'

class CourseList extends React.Component {
    static defaultProps = {
        courses: []
    }
    render() {
        const { courses } = this.props
        if (courses.length === 0) {
            return (
                <div className="w-4/5 mx-auto my-32">
                <table id="CourseList"  className="w-full border-collapse border border-gray-500">
                    <thead>
                        <CourseListRow textFirstCell="No course available yet" isHeader={true} />
                    </thead>
                </table>
                </div>
            )
        } else {
            return (
                <div className="w-4/5 mx-auto my-32 w-4/5 h-[29vh]">
                <table id="CourseList" className="w-full border-collapse border border-gray-500">
                    <thead>
                        <CourseListRow textFirstCell="Available courses" isHeader={true} />
                        <CourseListRow textFirstCell="Course name" textSecondCell="Credit" isHeader={true} />
                    </thead>
                    <tbody>
                        {courses.map((course) => (
                            <CourseListRow
                                key={course.id}
                                textFirstCell={course.name}
                                textSecondCell={course.credit}
                                isHeader={false}
                            />
                        ))}
                    </tbody>
                </table>
                </div>

            )
        }
    }
}

const CourseListWithLogging = WithLogging(CourseList)
export default CourseListWithLogging