import { Injectable } from "@angular/core";
import { MasterService } from "../master.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { LOGIN_REQUEST, loginFailure, loginSuccess } from "./login.action";
import { catchError, exhaustMap, map, of, tap } from "rxjs";



@Injectable()

export class LoginEffects{

   
    constructor( private service :MasterService,private action$:Actions) {
        
    }

    _login = createEffect(()=>
        this.action$.pipe(
            ofType(LOGIN_REQUEST),
            exhaustMap((action:{data:any})=>{
                return this.service.authenticateUser(action.data).pipe(
                    tap((response) => console.log('Authentication response:', response)),
                   map((response)=> loginSuccess({message:response.token})),
                    catchError((error) => of(loginFailure({error:error})))
                )
            })
        )
    )
}

