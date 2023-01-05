import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { skillsSlice } from "./slices/skills.slice";
import { coursesSlice } from "./slices/courses.slice";

const makeStore = () =>
  configureStore({
    reducer: combineReducers({
      [skillsSlice.name]: skillsSlice.reducer,
      [coursesSlice.name]: coursesSlice.reducer,
    }),
    devTools: true,
  });

export type AppStore = ReturnType<typeof makeStore>;

export const wrapper = createWrapper<AppStore>(makeStore);
