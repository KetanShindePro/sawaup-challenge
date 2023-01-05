import { Courses } from "@prisma/client";
import { useSelector } from "react-redux";
import { selectAllCourses } from "../../../store/slices/courses.slice";
import CourseCard from "../../cards/cards.components";

function AllCourses() {
  const courses = useSelector(selectAllCourses);
  return (
    <>
      {courses?.map((course: Courses) => {
        return (<CourseCard key={course.id} course={course} />)
      })}
    </>
  );
}

export default AllCourses;