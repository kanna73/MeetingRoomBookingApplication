import { Injectable } from "@angular/core";
import { MasterService } from "../master.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { REGISTER_REQUEST, registerFailure, registerSuccess } from "./register.action";
import { catchError, exhaustMap, map, of } from "rxjs";

@Injectable()

export class RegisterEffects{
  
   
    constructor(private service:MasterService,private action$:Actions) {
        
    }

    _register = createEffect(()=> this.action$.pipe(
                ofType(REGISTER_REQUEST),
                exhaustMap((action:{registerData:any})=>{
                    return this.service.register(action.registerData).pipe(
                        map((response)=> registerSuccess({message:response})),
                        catchError((error) => of(registerFailure({error:error})))
                    )
                })
    ))
}