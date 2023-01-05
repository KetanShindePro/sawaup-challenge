import { createSlice } from "@reduxjs/toolkit";
import { hydrate } from "../actions";
import { AppState, CoursesStateType } from "../types";
import { Courses } from "@prisma/client";

export const coursesSlice = createSlice({
  name: "courses",

  initialState: {
    allCourses: [],
  } as CoursesStateType,

  reducers: {
    setCourses(
      state: CoursesStateType,
      action: { payload: Courses[] }
    ): CoursesStateType {
      return {
        ...state,
        allCourses: action.payload,
      };
    },
  },

  extraReducers: (builder) => {
    builder.addCase(hydrate, (state, action) => {
      //   console.log("HYDRATE", state, action.payload);
      return {
        ...state,
        ...action.payload.courses,
      };
    });
  },
});

// exporting coursesSlice actions
export const { setCourses } = coursesSlice.actions;

// courses slice selectors

export const selectAllCourses = (state: AppState) =>
  state?.[coursesSlice.name]?.allCourses;

export const getSuggestedCourses = (state: AppState) => {
    return state?.[coursesSlice.name]?.allCourses;
}
