import { Search } from "@mui/icons-material";
import { AppBar, Box, Grid, TextField, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Skills } from "@prisma/client";
import styles from "../../../styles/skills-selector.module.css";

type SkillSelectorProps = {
  skills: Skills[];
};

function SkillsSelector(props: SkillSelectorProps) {
  const { skills } = props;

  return (
    <Box sx={{ mt: "2vw" }}>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={12} md={12}>
          <TextField
            id="outlined-search"
            label="Search Skills"
            type="search"
            placeholder="Search Skills"
            color="secondary"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          {skills.map((skill: Skills) => {
            return <div key={skill.id}>{skill.name}</div>;
          })}
        </Grid>
      </Grid>
    </Box>
  );
}

export default SkillsSelector;
