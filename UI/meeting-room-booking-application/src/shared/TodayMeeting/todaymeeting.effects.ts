import { Injectable } from "@angular/core";
import { MasterService } from "../master.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { LOAD_TODAY_MEETING, loadMeetingFailure, loadMeetingSuccess } from "./todaymeeting.action";
import { catchError, exhaustMap, map, of, tap } from "rxjs";

@Injectable()


export class MeetingEffects{

    constructor(private service:MasterService,private action$:Actions ) {     
    }

    _meeting = createEffect(()=>this.action$.pipe(
        ofType(LOAD_TODAY_MEETING),
        exhaustMap(() => {
            return this.service.getTodayMeeting().pipe(
                tap((response) => console.log('TodayMeeting response:', response)),
                map((response) => loadMeetingSuccess({ list: response })),
                tap((response) => console.log('TodayMeeting response:', response)),
                catchError((error) => of(loadMeetingFailure({ errorMessage: error })))
            );
        })
    ))
}