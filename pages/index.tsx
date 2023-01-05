import prisma from "../lib/prisma";
import { Courses, Skills } from "@prisma/client";
import styles from "../styles/Home.module.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import SkillsPane from "../components/skills/skills-pane/skills-pane.component";
import AllCourses from "../components/courses/all-courses/all-courses.component";
import { connect } from "react-redux";
import { wrapper } from "../store/store";
import { setSkills } from "../store/slices/skills.slice";

type HomeProps = {
  courses: Courses[];
  skills: Skills[];
};

function Home(props: HomeProps) {
  const { courses, skills } = props;

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
          <SkillsPane skills={skills} />
        </Grid>
        <Grid item xs={12} sm={12} md={8}>
          <AllCourses courses={courses} />
        </Grid>
      </Grid>
    </Box>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    const skills: Skills[] = await prisma.skills.findMany({
      include: {
        courseSkillMap: true,
      },
    });
    store.dispatch({ type: setSkills, payload: skills });

    return {
      props: {
        skills,
      },
    };
  }
);

export default connect((state) => state)(Home);
