import { createReducer, on } from "@ngrx/store";
import { initialState } from "./login.state";
import { loginFailure, loginRequest, loginSuccess } from "./login.action";




const _loginReducer=createReducer(initialState,
    on(loginSuccess,(state,action)=>{
        return{
            ...state,
            token:action.message
           
        }
    }),
    on(loginFailure,(state,action)=>{
        return{
            ...state,
            token:'',
            ID:action.error.error.ID,
            Message:action.error.error.Message
        }
    })
    )

export function loginReducer(state:any,action:any)
{
    return _loginReducer(state,action);
}