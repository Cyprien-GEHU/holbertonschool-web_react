import CourseListRow from "./CourseListRow";

function CourseList({ courses = [] }) {
  if (courses.length === 0) {
    return (
      <div className="w-4/5 mx-auto mt-8">
        <table className="w-full border border-gray-400 border-collapse">
          <tbody>
            <CourseListRow
              isHeader={true}
              textFirstCell="No course available yet"
            />
          </tbody>
        </table>
      </div>
    );
  }
  return (
    <div className="w-4/5 mx-auto mt-8">
      <table className="w-full border border-gray-400 border-collapse">
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
