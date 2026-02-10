import CourseListRow from "./CourseListRow";
import "./CourseList.css";

function CourseList({ courses = [] }) {
  if (courses.length === 0) {
    return (
      <div className="containerCourse">
        <table id="empty">
          <tbody>
            <CourseListRow
              isHeader={false}
              textFirstCell="No course available yet"
            />
          </tbody>
        </table>
      </div>
    );
  }
  return (
    <div className="containerCourse">
      <table id="tableCourse">
        <thead>
          <CourseListRow textFirstCell="Available courses" isHeader={true} />
          <CourseListRow
            isHeader={true}
            textFirstCell="Course name"
            textSecondCell="Credit"
          />
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
  );
}

export default CourseList;
