import { useDispatch, useSelector } from "react-redux";
import { getUserData, setUser } from "../../store/slices/user.slice";
import { useEffect, useState } from "react";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";

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

function UserModal() {
  const userData = useSelector(getUserData);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(true);
  const [username, setUsername] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (userData) {
      handleClose();
    } else {
      handleOpen();
    }
  }, [userData]);

  const fetchOrSetUserData = async () => {
    const fetchResponse = await fetch("/api/get-user", {
      method: "POST",
      body: JSON.stringify({ username }),
    });
    let usrDt = await fetchResponse.json();
    if (!usrDt?.user) {
      const setResponse = await fetch("/api/set-user", {
        method: "POST",
        body: JSON.stringify({ username }),
      });

      usrDt = await setResponse.json()
    }
    dispatch(setUser(usrDt?.user));
  };

  return (
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
          onClick={() => fetchOrSetUserData()}
        >
          Enter
        </Button>
      </Box>
    </Modal>
  );
}

export default UserModal;
