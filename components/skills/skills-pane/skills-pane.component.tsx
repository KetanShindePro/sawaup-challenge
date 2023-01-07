import * as React from "react";
import { Skills } from "@prisma/client";
import Grid from "@mui/material/Grid";
import SkillsSelector from "../skills-selector/skills-selector.component";
import SelectedSkills from "../selected-skills/selected-skills.component";
import { Box, Typography } from "@mui/material";

function SkillsPane() {
  return (
    <Box sx={{ m: "2vw" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12}>
          <Typography variant="h5" gutterBottom>
            Selected skills for course suggestions
          </Typography>
          (Please select atleast two skills to see suggestion. And you can not
          select more than 10 skills.)
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <SelectedSkills />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Typography variant="h5" gutterBottom>
            Select from below skills
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <SkillsSelector />
        </Grid>
      </Grid>
    </Box>
  );
}

export default SkillsPane;
