import { Box, Chip, Grid, TextField } from "@mui/material";
import { Skills } from "@prisma/client";
import { useSelector, useDispatch } from "react-redux";
import {
  getSelectedSkills,
  selectAllSkills,
} from "../../../store/slices/skills.slice";
import { addSelectedSkill } from "../../../store/actions";
import { useState } from "react";

function SkillsSelector() {
  const skills = useSelector(selectAllSkills);
  const selectedSkills = useSelector(getSelectedSkills);
  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState("");

  const filteredSkills = skills.filter((skl) =>
    skl.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Box sx={{ mr: "3vw" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12}>
          <TextField
            id="outlined-search"
            label="Search Skills"
            type="search"
            value={searchText}
            fullWidth
            onChange={(evt) => {
              setSearchText(evt.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          {filteredSkills.map((skl: Skills) => {
            return (
              <Chip
                key={skl.id}
                label={skl.name}
                data-testid={skl.id}
                sx={{ m: "0.2rem" }}
                onClick={() => {
                  if (selectedSkills.length < 10) {
                    dispatch(addSelectedSkill(skl.id));
                  }
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
