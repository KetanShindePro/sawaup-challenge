import { GetServerSideProps } from "next";
import prisma from "../lib/prisma";
import { Courses, Skills } from "@prisma/client";
import styles from "../styles/Home.module.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

type HomeProps = {
  courses: Courses[];
  skills: Skills[];
};

export default function Home(props: HomeProps) {
  const { courses, skills } = props;
  console.log("courses: ", courses);
  console.log("skills: ", skills);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid xs={6} md={8}>
          <img
            src="https://www.sawaup.com/assets/icons/logo-white-sawaup.svg"
            alt="This is a logo Image."
            className={styles.logo}
          />
        </Grid>
        <Grid xs={6} md={4}>
          data 1
        </Grid>
        <Grid xs={6} md={4}>
          data 2
        </Grid>
        <Grid xs={6} md={8}>
          data 3
        </Grid>
      </Grid>
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps<{
  courses: Courses[];
}> = async () => {
  const courses: Courses[] = await prisma.courses.findMany({
    include: {
      courseSkillMap: true,
    },
  });

  const skills: Skills[] = await prisma.skills.findMany({
    include: {
      courseSkillMap: true,
    },
  });

  return {
    props: {
      courses,
      skills,
    },
  };
};
