import { createReducer, on } from "@ngrx/store";
import { Initialtoken } from "./token.state";
import { setEmail, setName, setToken } from "./token.action";

const _tokenReducer=createReducer(Initialtoken,
    on(setToken,(state,action)=>{
        return{
            ...state,
            token:action.value
        };
    }),
    on(setName,(state,action)=>{
        return{
            ...state,
            name:action.value
        };
    }),
    on(setEmail,(state,action)=>{
        return{
            ...state,
            email:action.value
        };
    })
    )


export function tokenReducer(state:any,action:any)
{
    return _tokenReducer(state,action);
}