import { CourseType, SkillType } from "../store/types";

export function filterCoursesForSelectedSkills(
  courses: CourseType[],
  selectedSkills: SkillType[]
) {
  let filteredCourses: { [key: string]: number } = {};
  let sortedFilteredCourses: CourseType[] = [];

  for (let i = 0; i < selectedSkills.length; i++) {
    const { courseSkillMap } = selectedSkills[i];
    for (let j = 0; j < courseSkillMap.length; j++) {
      const { courseId } = courseSkillMap[j];
      if (filteredCourses[courseId]) {
        filteredCourses[courseId] += 1;
      } else {
        filteredCourses[courseId] = 1;
      }
    }
  }

  const sortedCourses = Object.entries(filteredCourses).sort(
    (fltrdCourse1, fltrdCourse2) => {
      if (fltrdCourse1[1] < fltrdCourse2[1]) {
        return 1;
      }
      if (fltrdCourse1[1] > fltrdCourse2[1]) {
        return -1;
      }
      return 0;
    }
  );

  for (let i = 0; i < sortedCourses.length; i++) {
    const [srtdCourse] = sortedCourses[i];
    const courseToAdd = courses.find((crs) => crs.id === srtdCourse);
    courseToAdd ? sortedFilteredCourses.push(courseToAdd) : null;
  }

  return sortedFilteredCourses.length
    ? sortedFilteredCourses.slice(0, 4)
    : courses;
}
