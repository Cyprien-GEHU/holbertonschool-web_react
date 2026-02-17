import CourseListRow from "./CourseListRow";

function CourseList({ courses = [] }) {
  return (
    <div className="w-[85%] mx-auto mt-8">
      <table className="w-full border-collapse border border-gray-400">
        {courses.length === 0 ? (
          <tbody>
            <CourseListRow
              isHeader={true}
              textFirstCell="No course available yet"
              textSecondCell=""
            />
          </tbody>
        ) : (
          <>
            <thead>
              <CourseListRow
                isHeader={true}
                textFirstCell="Available courses"
                textSecondCell=""
              />
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
                  isHeader={false}
                  textFirstCell={course.name}
                  textSecondCell={course.credit}
                />
              ))}
            </tbody>
          </>
        )}
      </table>
    </div>
  );
}

export default CourseList;
