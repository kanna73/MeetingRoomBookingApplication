import { Actions, createEffect, ofType } from "@ngrx/effects";
import { POST_REQUEST, postFailure, postSuccess } from "./bookmeeting.action";
import { catchError, exhaustMap, map, of, tap } from "rxjs";
import { MasterService } from "../master.service";
import { Injectable } from "@angular/core";
import { booking } from "../../app/Interface/bookinInterface";


@Injectable()
export class BookingEffects{

    constructor(private action$:Actions,private service:MasterService) {
        
    }

    _booking = createEffect(() => this.action$.pipe
     (ofType(POST_REQUEST),
        exhaustMap((action: { data: any }) => {
            return this.service.addBooking(action.data).pipe(
                map(respone => postSuccess({ message: respone.message })),
                catchError(error => of(postFailure({ error: error.message })))
            )
        })
    ))
}

