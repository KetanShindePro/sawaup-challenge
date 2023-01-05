import { useSelector } from "react-redux";
import { selectAllCourses } from "../../../store/slices/courses.slice";
import CourseCard from "../../cards/cards.components";
import { CourseType } from "../../../store/types";

function AllCourses() {
  const courses = useSelector(selectAllCourses);
  return (
    <>
      {courses?.map((course: CourseType) => {
        return (<CourseCard key={course.id} course={course} />)
      })}
    </>
  );
}

export default AllCourses;