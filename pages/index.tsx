import prisma from "../lib/prisma";
import Grid from "@mui/material/Grid";
import SkillsPane from "../components/skills/skills-pane/skills-pane.component";
import AllCourses from "../components/courses/all-courses/all-courses.component";
import { connect, useDispatch, useSelector } from "react-redux";
import { wrapper } from "../store/store";
import { setSkills } from "../store/slices/skills.slice";
import { setCourses } from "../store/slices/courses.slice";
import { CourseType, SkillType, UserType } from "../store/types";
import { useEffect, useState } from "react";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { getUserData, setUser } from "../store/slices/user.slice";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#a9c5ed",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Home() {
  const userData = useSelector(getUserData);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(true);
  const [username, setUsername] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    console.log("userData: ", userData)
    if (userData) {
      handleClose();
    } else {
      handleOpen();
    }
  }, [userData]);

  const fetchUserData = async () => {
    const response = await fetch("/api/get-user", {
      method: "POST",
      body: JSON.stringify({ username }),
    });
    const usrDt = await response.json();
    console.log("usrDt : ", usrDt);
    dispatch(setUser(usrDt));
  };

  return (
    <>
      <Grid item xs={12} sm={12} md={4}>
        <SkillsPane />
      </Grid>
      <Grid item xs={12} sm={12} md={8}>
        <AllCourses />
      </Grid>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Enter Username
          </Typography>
          <Typography id="modal-modal-description">
            (Use the previous one if already entered.)
          </Typography>
          <TextField
            id="outlined-basic"
            label="Username"
            variant="outlined"
            value={username}
            sx={{ mt: 2 }}
            fullWidth
            onChange={(event) => setUsername(event.target.value)}
          />
          <Button
            variant="contained"
            sx={{ mt: 2 }}
            onClick={() => fetchUserData()}
          >
            Enter
          </Button>
        </Box>
      </Modal>
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

export default connect((state) => state)(Home);
