import prisma from "../../lib/prisma";
import { useSelector } from "react-redux";
import { wrapper } from "../../store/store";
import { setSkills } from "../../store/slices/skills.slice";
import { setCourses } from "../../store/slices/courses.slice";
import { CourseType, SkillType } from "../../store/types";
import { selectUserFavourites } from "../../store/slices/user.slice";
import DisplayCourses from "../../components/courses/display-courses/display-courses.component";
import { Typography } from "@mui/material";

function Favorites() {
  const userFavouriteCourses = useSelector(selectUserFavourites);

  return (
    <>
      <Typography variant="h4" gutterBottom sx={{ m: "2rem" }}>
        {"Favorite Courses"}
      </Typography>
      <DisplayCourses courses={userFavouriteCourses} />;
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    const courses: CourseType[] = await prisma.courses.findMany({
      include: {
        courseSkillMap: true,
        videos: true,
      },
    });

    const skills: SkillType[] = await prisma.skills.findMany({
      include: {
        courseSkillMap: true,
      },
    });

    store.dispatch({ type: setCourses, payload: courses });
    store.dispatch({ type: setSkills, payload: skills });

    return {
      props: {},
    };
  }
);

export default Favorites;
