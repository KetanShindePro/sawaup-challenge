import { Box, Chip, Grid, TextField } from "@mui/material";
import { Skills } from "@prisma/client";
import { useSelector, useDispatch } from "react-redux";
import { selectAllSkills } from "../../../store/slices/skills.slice";
import { addSelectedSkill } from "../../../store/actions";

function SkillsSelector() {
  const skills = useSelector(selectAllSkills);
  const dispatch = useDispatch();

  return (
    <Box sx={{ mr: "3vw" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12}>
          <TextField
            id="outlined-search"
            label="Search Skills"
            type="search"
            placeholder="Search Skills"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          {skills.map((skill: Skills) => {
            return (
              <Chip
                key={skill.id}
                label={skill.name}
                sx={{ m: "0.2rem" }}
                onClick={() => {
                  dispatch(addSelectedSkill(skill.id));
                }}
              />
            );
          })}
        </Grid>
      </Grid>
    </Box>
  );
}

export default SkillsSelector;
