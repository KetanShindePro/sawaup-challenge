import { useSelector } from "react-redux";
import { selectAllCourses } from "../../../store/slices/courses.slice";
import { getSelectedSkills } from "../../../store/slices/skills.slice";
import CourseCard from "../../cards/cards.components";
import { CourseType } from "../../../store/types";
import { Grid } from "@mui/material";
import { useMemo } from "react";
import { filterCoursesForSelectedSkills } from "../../../lib/utility";

function AllCourses() {
  const courses = useSelector(selectAllCourses);
  const selectedSkills = useSelector(getSelectedSkills);

  const memoisedFilteredCourses = useMemo(() => {
    return filterCoursesForSelectedSkills(courses, selectedSkills);
  }, [selectedSkills]);

  return (
    <Grid container>
      {memoisedFilteredCourses?.map((course: CourseType) => {
        return <CourseCard key={course.id} course={course} />;
      })}
    </Grid>
  );
}

export default AllCourses;
