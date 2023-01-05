import { createAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

export const hydrate = createAction(HYDRATE, function prepare(payload: any) {
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