import { Skills } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";
import { hydrate, addSelectedSkill, removeSelectedSkill } from "../actions";
import { AppState, SkillsStateType } from "../types";

export const skillsSlice = createSlice({
  name: "skills",

  initialState: {
    allSkills: [],
    selectedSkills: [],
  } as SkillsStateType,

  reducers: {
    setSkills(
      state: SkillsStateType,
      action: { payload: Skills[] }
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
        //   console.log("HYDRATE", state, action.payload);
        return {
          ...state,
          ...action.payload.skills,
        };
      })
      .addCase(addSelectedSkill, (state, action) => {
        let skillToBeAdded = state.allSkills.find(
          (skl) => skl.id === action.payload
        );
        return skillToBeAdded
          ? {
              ...state,
              selectedSkills: [...state.selectedSkills, skillToBeAdded],
            }
          : state;
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
