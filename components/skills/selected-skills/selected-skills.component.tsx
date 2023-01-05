import { useSelector, useDispatch } from "react-redux";
import { getSelectedSkills } from "../../../store/slices/skills.slice";
import { removeSelectedSkill } from "../../../store/actions";
import { Skills } from "@prisma/client";
import { Chip } from "@mui/material";

function SelectedSkills() {
  const selectedSkills = useSelector(getSelectedSkills);
  const dispatch = useDispatch();

  return (
    <>
      {selectedSkills.map((skill: Skills) => {
        return (
          <Chip
            key={skill.id}
            label={skill.name}
            sx={{ m: "0.2rem" }}
            onDelete={() => {
              dispatch(removeSelectedSkill(skill.id));
            }}
          />
        );
      })}
    </>
  );
}

export default SelectedSkills;
