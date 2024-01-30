import { createAction, props } from "@ngrx/store";



export const REGISTER_REQUEST ='[Register page] register request';

export const REGISTER_SUCCESS ='[Register page] register success';

export const REGISTER_FAILURE ='[Register page] register failure';

export const registerRequest =createAction(REGISTER_REQUEST,props<{registerData:any}>());

export const registerSuccess = createAction(REGISTER_SUCCESS,props<{message:string}>());

export const registerFailure = createAction(REGISTER_FAILURE,props<{error:any}>());