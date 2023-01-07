import { createSlice } from "@reduxjs/toolkit";
import { hydrate, addSelectedSkill, removeSelectedSkill } from "../actions";
import { AppState, SkillType, SkillsStateType } from "../types";

export const skillsSlice = createSlice({
  name: "skills",

  initialState: {
    allSkills: [],
    selectedSkills: [],
  } as SkillsStateType,

  reducers: {
    setSkills(
      state: SkillsStateType,
      action: { payload: SkillType[] }
    ): SkillsStateType {
      return {
        ...state,
        allSkills: action.payload,
      };
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(hydrate, (state, action) => {
        return {
          ...state,
          allSkills: [...action.payload.skills.allSkills],
        };
      })
      .addCase(addSelectedSkill, (state, action) => {
        const skillAlreadyExists = state.selectedSkills.find(
          (skl) => skl.id === action.payload
        );
        if (skillAlreadyExists) {
          return state;
        } else {
          let skillToBeAdded = state.allSkills.find(
            (skl) => skl.id === action.payload
          );
          return skillToBeAdded
            ? {
                ...state,
                selectedSkills: [...state.selectedSkills, skillToBeAdded],
              }
            : state;
        }
      })
      .addCase(removeSelectedSkill, (state, action) => {
        let filteredSelectedSkills = state.selectedSkills.filter(
          (skl) => skl.id !== action.payload
        );
        return {
          ...state,
          selectedSkills: filteredSelectedSkills,
        };
      });
  },
});

// exporting skillsSlice actions
export const { setSkills } = skillsSlice.actions;

// skills slice selectors

export const selectAllSkills = (state: AppState) =>
  state?.[skillsSlice.name].allSkills;

export const getSelectedSkills = (state: AppState) =>
  state?.[skillsSlice.name].selectedSkills;
