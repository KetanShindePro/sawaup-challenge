import * as React from "react";
import { Skills } from "@prisma/client";
import Grid from "@mui/material/Grid";
import SkillsSelector from "../skills-selector/skills-selector.component";
import SelectedSkills from "../selected-skills/selected-skills.component";
import { Box } from "@mui/material";

type SkillsPaneProps = {
  skills: Skills[];
};

function SkillsPane(props: SkillsPaneProps) {
  const { skills } = props;
  return (
    <Box sx={{ m: '2vw' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12}>
          <SelectedSkills />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <SkillsSelector />
        </Grid>
      </Grid>
    </Box>
  );
}

export default SkillsPane;
