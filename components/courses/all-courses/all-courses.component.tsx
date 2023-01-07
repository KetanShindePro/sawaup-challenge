import { useSelector } from "react-redux";
import { selectAllCourses } from "../../../store/slices/courses.slice";
import { getSelectedSkills } from "../../../store/slices/skills.slice";
import { useMemo } from "react";
import { filterCoursesForSelectedSkills } from "../../../lib/utility";
import DisplayCourses from "../display-courses/display-courses.component";

function AllCourses() {
  const courses = useSelector(selectAllCourses);
  const selectedSkills = useSelector(getSelectedSkills);

  const memoisedFilteredCourses = useMemo(() => {
    return filterCoursesForSelectedSkills(courses, selectedSkills);
  }, [selectedSkills]);

  return <DisplayCourses courses={memoisedFilteredCourses} />;
}

export default AllCourses;
