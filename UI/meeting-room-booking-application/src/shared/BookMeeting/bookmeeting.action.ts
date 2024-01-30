import { createAction, props } from "@ngrx/store";
import { booking } from "../../app/Interface/bookinInterface";



export const POST_REQUEST ='[Post] Post Requset';

export const POST_SUCCESS ='[Post] Post Success';

export const POST_FAILURE ='[Post] Post Failure';

export const postRequest = createAction(POST_REQUEST,props<{data:any}>());

export const postSuccess = createAction(POST_SUCCESS,props<{message:string}>());

export const postFailure = createAction(POST_FAILURE,props<{error:string}>());