// import { Injectable } from "@angular/core";
// import { MasterService } from "../master.service";
// import { createEffect, ofType, Actions } from "@ngrx/effects";
// import { LOAD_LOCATION, loadLoactionFail, setLocation } from "./location.action";
// import { EMPTY, EmptyError, catchError, exhaustMap, forkJoin, map, mergeMap, of, tap } from "rxjs";


// @Injectable()

// export class LocationEffects {

//     constructor(private action$: Actions, private service: MasterService) {

//     }

//     //    _location = createEffect(()=>
//     //      this.action$.pipe(
//     //         ofType(LOAD_LOCATION),
//     //         tap(() => console.log('Load Location Effect triggered')),
//     //         exhaustMap(()=>{
//     //             return this.service.getallLocation().pipe(
//     //                 map((data) =>setLocation({ value: data })),
//     //                 catchError((_error)=>of(loadLoactionFail({Error:_error})))
//     //             )
//     //         }),
//     //      )  
//     //    )  

//     _loactionByID = createEffect(() =>
//         this.action$.pipe(
//             ofType(LOAD_LOCATION),
//             exhaustMap(() => this.service.getLoactionByID(1).pipe(
//                 exhaustMap((data1) => {
//                     return this.service.getLoactionByID(2).pipe(
//                         exhaustMap((data2) => [
//                             setLocation({ value: data1 }),
//                             setLocation({ value: data2 }),
//                         ])
//                     )
//                 })
//             )
//             )
//         )
//     )

//     _LocationById = createEffect(()=>
//     this.action$.pipe(
//         ofType(LOAD_LOCATION),
//         exhaustMap(()=>
//         forkJoin({
//             location1: this.service.getLoactionByID(1),
//             location2: this.service.getLoactionByID(2),
//         }).pipe(
//             map(({location1,location2})=>[ setLocation({ value: location1 }),setLocation({ value: location2 }), ])
//         )        
//     )
//     )
// }      

import { Injectable } from "@angular/core";
import { MasterService } from "../master.service";
import { createEffect, ofType, Actions } from "@ngrx/effects";
import { LOAD_LOCATION, loadLoactionFail, setLocation } from "./location.action";
import { catchError, exhaustMap, forkJoin, map, mergeMap, of, tap } from "rxjs";

@Injectable()
export class LocationEffects {

    constructor(private action$: Actions, private service: MasterService) {}

    //        _location = createEffect(()=>
    //      this.action$.pipe(
    //         ofType(LOAD_LOCATION),
    //         tap(() => console.log('Load Location Effect triggered')),
    //         exhaustMap(()=>{
    //             return this.service.getallLocation().pipe(
    //                 map((data) =>setLocation({ value: data })),
    //                 catchError((_error)=>of(loadLoactionFail({Error:_error})))
    //             )
    //         }),
    //      )  
    //    )  

    

    _loactionByID = createEffect(() =>
        this.action$.pipe(
            ofType(LOAD_LOCATION),
            exhaustMap(() =>
                forkJoin({
                    location1: this.service.getLoactionByID(1),
                    location2: this.service.getLoactionByID(2),
                }).pipe(
                    map(({ location1, location2 }) => 
                        setLocation({ value: this.combineApiResults(location1,location2) }),
                    ),
                    catchError((error) => of(loadLoactionFail({ Error: error })))
                )
            )
        )
    );

     combineApiResults(location1:any,loaction2:any)
    {
        return [...location1,...loaction2];
    }
   
}




