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
            locationList:[...state.locationList,...action.value],
            ErrorID:0,
            ErrorMessage:''
        }
    }),
    on(loadLoactionFail,(state,action)=>{
        return{
            ...state,
            locationList:[],
            ErrorID:action.Error.error.ID,
            ErrorMessage:action.Error.error.Message
        }
    })
    )


export function locationReducer(state: any,action: any){
  return _locationReducer(state,action);
}