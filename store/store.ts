import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { skillsSlice } from "./slices/skills.slice";

const makeStore = () =>
  configureStore({
    reducer: {
      [skillsSlice.name]: skillsSlice.reducer,
    },
    devTools: true,
  });

export type AppStore = ReturnType<typeof makeStore>;

export const wrapper = createWrapper<AppStore>(makeStore);
