import { createReducer, on } from "@ngrx/store";
import { loadLoaction, loadLoactionFail, setLocation } from "./location.action";
import { locationState } from "./location.state";




const _locationReducer=createReducer(locationState,
    
    on(loadLoaction,(state)=>{
        return{
            ...state
        }
    }),

    on(setLocation,(state,action)=>{
        return{
            ...state,
            locationList:action.value,
            ErrorText:''
        }
    }),
    on(loadLoactionFail,(state,action)=>{
        return{
            ...state,
            locationList:[],
            ErrorText:action.Error
        }
    })
    )


export function locationReducer(state: any,action: any){
  return _locationReducer(state,action);
}