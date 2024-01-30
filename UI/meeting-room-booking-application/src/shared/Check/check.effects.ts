import { Store } from "@ngrx/store";
import { MasterService } from "../master.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { LOAD_CHECK_REQUEST, loadCheckFailure, loadCheckSuccess } from "./check.action";
import { catchError, exhaustMap, map, of, tap } from "rxjs";
import { Injectable } from "@angular/core";


@Injectable()


export class CheckEffects{

    constructor( private action$:Actions,private service:MasterService) {      
    }

    _check = createEffect (()=> this.action$.pipe(
        ofType(LOAD_CHECK_REQUEST),
        tap(() => console.log(' POST_REQUEST Effect triggered')),  // Add this line
        exhaustMap((action:{requestData:any})=>{
            console.log("recieved data ",action.requestData)
            return this.service.checkAvailablity(action.requestData).pipe(
                tap((response) => console.log('check response:', response)),
                map((response) => loadCheckSuccess({value:response})),
                catchError((error) => of(loadCheckFailure({value:error})))
            )
        })

    ))
}   