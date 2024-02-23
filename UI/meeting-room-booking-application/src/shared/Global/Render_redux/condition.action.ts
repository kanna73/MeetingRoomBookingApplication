import { createAction, props } from "@ngrx/store";

export const setProfile =createAction("setProfile",props<{value:boolean}>());
export const setBooking =createAction("setBooking",props<{value:boolean}>());
export const setView =createAction("setView",props<{value:boolean}>());
export const setSide = createAction("setSide",props<{value:boolean}>());