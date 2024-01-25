import { Injectable } from "@angular/core";
import { MasterService } from "../master.service";
import { createEffect, ofType,Actions } from "@ngrx/effects";
import {LOAD_LOCATION, loadLoactionFail, setLocation } from "./location.action";
import { EMPTY, EmptyError, catchError, exhaustMap, map, of, tap } from "rxjs";


@Injectable()

export class LocationEffects{
  
    constructor(private action$:Actions,private service:MasterService) {
        
    }

   _location = createEffect(()=>
     this.action$.pipe(
        ofType(LOAD_LOCATION),
        tap(() => console.log('Load Location Effect triggered')),  // Add this line
        exhaustMap(()=>{
            return this.service.getallLocation().pipe(
                map((data) => setLocation({ value: data })),
                catchError((_error)=>of(loadLoactionFail({Error:_error.message})))
            )
        }),

     )
   )
}