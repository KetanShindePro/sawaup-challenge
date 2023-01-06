import { createSlice } from "@reduxjs/toolkit";
import { hydrate } from "../actions";
import { AppState, UserType, UserStateType } from "../types";

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
    builder.addCase(hydrate, (state, action) => {
      return action.payload.user.data
        ? {
            ...state,
            ...action.payload.user,
          }
        : {
            ...state,
          };
    });
  },
});

// exporting userSlice actions
export const { setUser } = userSlice.actions;

// user slice selectors

export const getUserData = (state: AppState) => state?.[userSlice.name]?.data;

export const selectUserFavourites = (state: AppState) =>
  state?.[userSlice.name]?.data?.favourites;
