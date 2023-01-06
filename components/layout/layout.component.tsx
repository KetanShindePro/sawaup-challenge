import { Box, Grid } from "@mui/material";
import styles from "../../styles/layout.module.css";

function WithLayout(
  WrappedComponent: JSX.Element
) {
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
        {WrappedComponent}
      </Grid>
    </Box>
  );
}

export default WithLayout;
