import { createReducer, on } from "@ngrx/store";
import { initialState } from "./register.state";
import { registerFailure, registerSuccess } from "./register.action";


const _registerReducer = createReducer (initialState,
    on(registerSuccess,(state,action)=>{
        console.log("response from register ",action.message)
        return{
            ...state,
            message:action.message,
        }
    }),
    on(registerFailure,(state,action)=>{
        return{
            ...state,
            message:'',
            errorID:action.error.error.ID,
            errorMessage:action.error.error.Message,
        }
    })
    )

export function registerReducer(state:any,action:any){
    return _registerReducer(state,action);
}