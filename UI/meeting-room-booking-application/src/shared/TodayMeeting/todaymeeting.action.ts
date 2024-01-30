import { createAction, props } from "@ngrx/store";
import { todayMeeting } from "./todaymeeting.model";



export const LOAD_TODAY_MEETING='[Meeting Page]meeting load ';

export const LOAD_TODAY_MEETING_SUCCESS='[Meeting Page]meeting load success';

export const LOAD_TODAY_MEETING_FAILURE='[Meeting Page] meeting load failure';

export const loadMeeting = createAction(LOAD_TODAY_MEETING);

export const loadMeetingSuccess = createAction(LOAD_TODAY_MEETING_SUCCESS,props<{list:todayMeeting[]}>());

export const loadMeetingFailure = createAction(LOAD_TODAY_MEETING_FAILURE,props<{errorMessage:string}>());