import { createReducer, on } from "@ngrx/store"
import { initialState } from "./room.state"
import { loadRoomFailure, loadRoomSuccess } from "./room.action"



const _roomReducer = createReducer (initialState,
    on(loadRoomSuccess,(state,action)=>{
        return{
            ...state,
            roomlist:action.data
        }
    }),
    on(loadRoomFailure,(state,action)=>{
        return{
            ...state,
            error:action.data
        }
    })
    )

export function roomReducer (state:any,action:any){
    return _roomReducer(state,action)
}