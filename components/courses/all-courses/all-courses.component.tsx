import { Courses } from "@prisma/client";

type AllCourses = {
  courses: Courses[];
};

function AllCourses(props: AllCourses) {
  const { courses } = props;
  return (
    <>
      {/* {courses.map((course: Courses) => {
        return <div key={course.id}>{course.name}</div>;
      })} */}
    </>
  );
}

export default AllCourses;