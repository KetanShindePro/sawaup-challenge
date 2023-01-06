import { useSelector } from "react-redux";
import { selectAllCourses } from "../../../store/slices/courses.slice";
import CourseCard from "../../cards/cards.components";
import { CourseType } from "../../../store/types";
import { Grid } from "@mui/material";

function AllCourses() {
  const courses = useSelector(selectAllCourses);
  return (
    <Grid container>
      {courses?.map((course: CourseType) => {
        return <CourseCard key={course.id} course={course} />;
      })}
    </Grid>
  );
}

export default AllCourses;
