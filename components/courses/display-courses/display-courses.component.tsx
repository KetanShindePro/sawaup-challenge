import CourseCard from "../../cards/cards.components";
import { CourseType } from "../../../store/types";
import { Grid } from "@mui/material";

function DisplayCourses(props: { courses: (CourseType | undefined)[] }) {
  const { courses } = props;

  return (
    <Grid container>
      {courses?.map((course) => {
        return course?<CourseCard key={course.id} course={course} />:null;
      })}
    </Grid>
  );
}

export default DisplayCourses;
