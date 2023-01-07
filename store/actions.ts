import { createAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { AppState } from "./types";
import { Favourites } from "@prisma/client";

export const hydrate = createAction(HYDRATE, function prepare(payload: AppState) {
  return {
    payload: payload,
  };
});

export const addSelectedSkill = createAction("ADD_SELECTED_SKILL", function prepare(payload: string) {
  return {
    payload: payload,
  };
});

export const removeSelectedSkill = createAction("REMOVE_SELECTED_SKILL", function prepare(payload: string) {
  return {
    payload: payload,
  };
});

export const addFavoriteCourse = createAction("ADD_FAVORITE_COURSE", function prepare(payload: Favourites) {
  return {
    payload: payload,
  };
});