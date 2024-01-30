import { createAction, props } from "@ngrx/store";
import { locationModel } from "./location.model";



export const LOAD_LOCATION='[location load] load location';

export const LOAD_LOCATION_SUCCESS='[location load] loaction load succes';

export const LOAD_LOACTION_FAIL='[loaction load] loaction load fail'


export const loadLoaction=createAction(LOAD_LOCATION);

export const setLocation=createAction(LOAD_LOCATION_SUCCESS,props<{ value:locationModel[] }>()) ;  

export const loadLoactionFail=createAction(LOAD_LOACTION_FAIL,props<{Error:any}>());

