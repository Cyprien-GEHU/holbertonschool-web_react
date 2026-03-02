import CourseListRow from "./CourseListRow";

function CourseList({ courses = [] }) {
  return (
    <div className="w-4/5 mx-auto mt-8">
      <table id="CourseList" className="w-full border-collapse border border-gray-400">
        {courses.length === 0 ? (
          <thead>
            <CourseListRow
              isHeader={true}
              textFirstCell="No course available yet"
            />
          </thead>
        ) : (
          <>
            <thead>
              <CourseListRow
                isHeader={true}
                textFirstCell="Available courses"
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