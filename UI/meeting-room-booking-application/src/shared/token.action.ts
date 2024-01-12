import { createAction, props } from "@ngrx/store";

export const setToken=createAction("setToken",props<{value:string}>());
export const setName=createAction("setName",props<{value:string}>());
export const setEmail= createAction("setEmail",props<{value:string}>());
