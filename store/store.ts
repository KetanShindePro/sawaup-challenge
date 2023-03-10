import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { skillsSlice } from "./slices/skills.slice";
import { coursesSlice } from "./slices/courses.slice";
import { userSlice } from "./slices/user.slice";

const makeStore = () =>
  configureStore({
    reducer: combineReducers({
      [skillsSlice.name]: skillsSlice.reducer,
      [coursesSlice.name]: coursesSlice.reducer,
      [userSlice.name]: userSlice.reducer,
    }),
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
    // devTools: true,
  });

export type AppStore = ReturnType<typeof makeStore>;

export const wrapper = createWrapper<AppStore>(makeStore);
