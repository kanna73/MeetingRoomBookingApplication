import { createReducer, on } from "@ngrx/store";
import { setBooking, setProfile, setView } from "./condition.action";
import { conditionRendering } from "./condition.state";

const _conditionReducer=createReducer(conditionRendering,
    on(setProfile,(state,action)=>{
      return {
        ...state,
        profile:action.value
      }
    }),
    on(setBooking,(state,action)=>{
        return{
            ...state,
            booking:action.value
        }
    }),
    on(setView,(state,action)=>{
        return {
            ...state,
            view:action.value
        }
    })
    )

export function conditionReducer(state:any,action:any)
{
    return _conditionReducer(state,action);
}


