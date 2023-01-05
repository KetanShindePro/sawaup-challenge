import {
  Box,
  Chip,
  Grid,
  TextField,
} from "@mui/material";
import { Skills } from "@prisma/client";

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
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
            {skills.map((skill: Skills) => {
              return (
                <Chip
                  key={skill.id}
                  label={skill.name}
                  sx={{m:'0.2rem'}}
                  onClick={() => {
                    console.log("I am clicked");
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
