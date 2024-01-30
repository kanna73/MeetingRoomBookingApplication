import { createReducer, on } from "@ngrx/store"
import { initialState } from "./todaymeeting.state"
import { loadMeeting, loadMeetingFailure, loadMeetingSuccess } from "./todaymeeting.action"


const _meetingReducer= createReducer(initialState,
    on(loadMeeting,(state)=>{
        return{
            ...state    
        }
    }),
    on(loadMeetingSuccess,(state,action)=>{
        console.log("response data in load succcess",action.list);
        return{
            ...state,
            meetingList:action.list,
            ErrorText:''
        }
    }),
    on(loadMeetingFailure,(state,action)=>{
        console.log("response data in load succcess",action.errorMessage);
        return{
            ...state,
            meetingList:[],
            ErrorText:action.errorMessage
        }
    })
    )


export function meetingReducer(state:any,action:any){
    return _meetingReducer(state,action)
}