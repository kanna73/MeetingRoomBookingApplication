import { createReducer, on } from "@ngrx/store";
import { initialState } from "./check.state";
import { loadCheckFailure, loadCheckRequest, loadCheckSuccess } from "./check.action";


const _checkReducer = createReducer(initialState,  
    on(loadCheckSuccess,(state,action)=>{
        return{
            ...state,
            valid:action.value,
            errorMessage:''
        }
    }),
    on(loadCheckFailure,(state,action)=>{
        return{
            ...state,
            valid:false,
            errorMessage:action.type
        }
    })
    )

export function checkReducer (state:any,action:any){
    return _checkReducer(state,action);
}