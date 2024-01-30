import { createAction, props } from "@ngrx/store"



export const LOAD_CHECK_REQUEST='[Check page] check request';
export const LOAD_CHECK_SUCCESS = '[Check page] check success';
export const LOAD_CHECK_FAILURE= '[Check page] check failure';

export const loadCheckRequest = createAction(LOAD_CHECK_REQUEST,props<{requestData:any}>());

export const loadCheckSuccess = createAction(LOAD_CHECK_SUCCESS,props<{value:boolean}>());
export const loadCheckFailure = createAction(LOAD_CHECK_FAILURE,props<{value:string}>());

