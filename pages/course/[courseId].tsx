import { Box, Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import ReactPlayer from "react-player";
import { getCourseById, setCourses } from "../../store/slices/courses.slice";
import { wrapper } from "../../store/store";
import { CourseType, SkillType } from "../../store/types";
import { setSkills } from "../../store/slices/skills.slice";
import { useEffect, useState } from "react";

function CourseDisplay() {
  const router = useRouter();
  const courseId = router.query.courseId;
  const course = useSelector(getCourseById(courseId as string));
  const video = course?.videos[0];

  const [hasWindow, setHasWindow] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasWindow(true);
    }
  }, []);

  return (
    <>
      <Grid item xs={12} sm={12} md={12} sx={{ml:'8vw'}}>
        <Typography variant="h5" gutterBottom>
          {"Course - " + course?.name}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={12} md={12} sx={{ml:'8vw'}}>
        {hasWindow && (
          <ReactPlayer url={video?.url} controls={true} width={"80vw"} height={"40vw"} />
        )}
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

export default CourseDisplay;
