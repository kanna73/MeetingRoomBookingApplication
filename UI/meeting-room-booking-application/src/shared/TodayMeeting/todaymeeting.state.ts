import { todayMeeting } from "./todaymeeting.model";


export interface todayMeetingList{
    meetingList:todayMeeting[],
    ErrorText:string
}

export const initialState:todayMeetingList={
    meetingList:[],
    ErrorText:''
}