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

    _booking = createEffect(()=>this.action$.pipe(ofType(POST_REQUEST),
    tap(() => console.log(' POST_REQUEST Effect triggered')),  // Add this line
    exhaustMap((action :{data:any})=>{
        console.log("data ",action.data)
         return this.service.addBooking(action.data).pipe(
            map(respone => postSuccess({message:respone.message})),
            catchError(error => of(postFailure({error:error.message})))
         )
    })
    ))
}

