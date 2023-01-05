import prisma from "../lib/prisma";
import { Skills } from "@prisma/client";
import styles from "../styles/Home.module.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import SkillsPane from "../components/skills/skills-pane/skills-pane.component";
import AllCourses from "../components/courses/all-courses/all-courses.component";
import { connect } from "react-redux";
import { wrapper } from "../store/store";
import { setSkills } from "../store/slices/skills.slice";
import { setCourses } from "../store/slices/courses.slice";
import { CourseType } from "../store/types";

function Home() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={12} md={12} className={styles.alignCenter}>
          <img
            src="https://www.sawaup.com/assets/icons/logo-white-sawaup.svg"
            alt="This is a logo Image."
            className={styles.logo}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <SkillsPane />
        </Grid>
        <Grid item xs={12} sm={12} md={8}>
          <AllCourses />
        </Grid>
      </Grid>
    </Box>
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

    const skills: Skills[] = await prisma.skills.findMany({
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

export default connect((state) => state)(Home);
