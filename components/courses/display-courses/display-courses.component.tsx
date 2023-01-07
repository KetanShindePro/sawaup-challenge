import CourseCard from "../../cards/cards.components";
import { CourseType } from "../../../store/types";
import { Grid } from "@mui/material";

function DisplayCourses(props: { courses: (CourseType | undefined)[] }) {
  const { courses } = props;

  return (
    <Grid container sx={{mt: "2rem"}}>
      {courses?.map((course) => {
        return course?<CourseCard key={course.id} course={course} />:null;
      })}
    </Grid>
  );
}

export default DisplayCourses;
