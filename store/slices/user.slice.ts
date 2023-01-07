import { createSlice } from "@reduxjs/toolkit";
import { addFavoriteCourse, hydrate, removeFavoriteCourse } from "../actions";
import { AppState, UserType, UserStateType } from "../types";
import { coursesSlice } from "./courses.slice";
import { Favourites } from "@prisma/client";

export const userSlice = createSlice({
  name: "user",

  initialState: {
    data: null,
  } as UserStateType,

  reducers: {
    setUser(
      state: UserStateType,
      action: { payload: UserType }
    ): UserStateType {
      return {
        ...state,
        data: action.payload,
      };
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(hydrate, (state, action) => {
        return action.payload.user.data
          ? {
              ...state,
              ...action.payload.user,
            }
          : {
              ...state,
            };
      })
      .addCase(addFavoriteCourse, (state, action) => {
        return {
          ...state,
          data: {
            ...state.data,
            favourites: [
              ...(state.data?.favourites as Favourites[]),
              action.payload,
            ],
          } as UserType,
        };
      })
      .addCase(removeFavoriteCourse, (state, action) => {
        const { userId, courseId } = action.payload;
        const filteredFavorites = state.data?.favourites?.filter(
          (fav) => fav.userId !== userId || fav.courseId !== courseId
        );
        return {
          ...state,
          data: {
            ...state.data,
            favourites: [...(filteredFavorites as Favourites[])],
          } as UserType,
        };
      });
  },
});

// exporting userSlice actions
export const { setUser } = userSlice.actions;

// user slice selectors

export const getUserData = (state: AppState) => state?.[userSlice.name]?.data;

export const selectUserFavourites = (state: AppState) => {
  const allCourses = state?.[coursesSlice.name]?.allCourses;
  const favouritesCourses = state?.[userSlice.name]?.data?.favourites?.map(
    (fav) => allCourses.find((crs) => crs.id === fav.courseId)
  );

  return favouritesCourses?.length ? favouritesCourses : [];
};
