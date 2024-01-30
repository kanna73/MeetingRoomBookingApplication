import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { MasterService } from "../master.service";
import { LOAD_ROOM, loadRoomFailure, loadRoomSuccess } from "./room.action";
import { catchError, exhaustMap, map, of } from "rxjs";


@Injectable()

export class RoomEffects{
   
    constructor(private action$:Actions,private service:MasterService) {
        
    }

    _room = createEffect(()=> this.action$.pipe(
        ofType(LOAD_ROOM),
        exhaustMap((action :{Id:any})=>{
            return this.service.getMeetingRoom(action.Id).pipe(
                map((reponse) => loadRoomSuccess({data:reponse})),
                catchError((error) => of(loadRoomFailure({data:error})))
            )
        })
    ))
}