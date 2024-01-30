import { createAction, props } from "@ngrx/store";



export const LOGIN_REQUEST = '[Login Page] login requset';

export const LOGIN_SUCCESS ='[Login Page] login success';

export const LOGIN_FAILURE = '[Login Page] login failure';

export const loginRequest= createAction(LOGIN_REQUEST,props<{data:any}>());

export const loginSuccess= createAction(LOGIN_SUCCESS,props<{message:any}>());

export const loginFailure = createAction(LOGIN_FAILURE,props<{error:any}>());