import { createAction, props } from "@ngrx/store"



export const LOAD_ROOM = '[Meeting page] load room request'

export const LOAD_ROOM_SUCCESS ='[Meeting page] load room success'

export const LOAD_ROOM_FAILURE = '[Meeting page] load room failure'

export const loadRoomRequest = createAction(LOAD_ROOM,props<{Id:number}>());

export const loadRoomSuccess = createAction(LOAD_ROOM_SUCCESS,props<{data:any}>());

export const loadRoomFailure = createAction(LOAD_ROOM_FAILURE,props<{data:any}>());