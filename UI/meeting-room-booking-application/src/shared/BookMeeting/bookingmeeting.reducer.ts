import { createReducer, on } from "@ngrx/store";
import { postFailure, postSuccess } from "./bookmeeting.action";
import { initialState } from "./bookmeeting.state";


const _bookingReducer=createReducer(initialState,
    on(postSuccess,(state,action)=>{
        return{
            ...state,
            message:action.message,
            error:''
        }
    }),
    on(postFailure,(state,action)=>{
        return{
            ...state,
            message:'',
            error:action.error
        }
    })
    )

export function bookingReducer(state:any,action:any)
{
    return _bookingReducer(state,action);
}