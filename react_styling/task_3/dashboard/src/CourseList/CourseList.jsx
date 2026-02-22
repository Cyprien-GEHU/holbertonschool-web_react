import CourseListRow from "./CourseListRow";

function CourseList({ courses = [] }) {
  return (
    <div className="w-4/5 mx-auto">
      <table className="w-full border-collapse">
        <thead>
          {courses.length === 0 ? (
            <CourseListRow
              isHeader={true}
              textFirstCell="No course available yet"
            />
          ) : (
            <>
              <CourseListRow
                isHeader={true}
                textFirstCell="Available courses"
              />
              <CourseListRow
                isHeader={true}
                textFirstCell="Course name"
                textSecondCell="Credit"
              />
            </>
          )}
        </thead>
        <tbody>
          {courses.map((course) => (
            <CourseListRow
              key={course.id}
              isHeader={false}
              textFirstCell={course.name}
              textSecondCell={course.credit}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CourseList;
