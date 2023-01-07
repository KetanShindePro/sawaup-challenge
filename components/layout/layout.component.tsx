import styles from "../../styles/layout.module.css";
import { Box, Grid } from "@mui/material";
import UserModal from "../user-modal/user-modal.component";
import UserAvatar from "../user-avatar/user-avatar.component";

function WithLayout(WrappedComponent: JSX.Element) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={12} md={12} className={styles.alignCenter}>
          <img
            src="https://www.sawaup.com/assets/icons/logo-white-sawaup.svg"
            alt="This is a logo Image."
            className={styles.logo}
          />
          <UserAvatar />
        </Grid>
        {WrappedComponent}
        <UserModal />
      </Grid>
    </Box>
  );
}

export default WithLayout;
