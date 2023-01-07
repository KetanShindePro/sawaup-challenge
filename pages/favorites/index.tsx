import prisma from "../../lib/prisma";
import Grid from "@mui/material/Grid";
import SkillsPane from "../../components/skills/skills-pane/skills-pane.component";
import AllCourses from "../../components/courses/all-courses/all-courses.component";
import { connect, useDispatch, useSelector } from "react-redux";
import { wrapper } from "../../store/store";
import { setSkills } from "../../store/slices/skills.slice";
import { setCourses } from "../../store/slices/courses.slice";
import { CourseType, SkillType, UserType } from "../../store/types";
import { useEffect, useState } from "react";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { getUserData, setUser } from "../../store/slices/user.slice";

function Favorites() {
  const userData = useSelector(getUserData);

  return (
    <>
      <Grid item xs={12} sm={12} md={4}>
        <SkillsPane />
      </Grid>
      <Grid item xs={12} sm={12} md={8}>
        <AllCourses />
      </Grid>
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

export default connect((state) => state)(Favorites);
