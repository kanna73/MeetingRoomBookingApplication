import { createFeatureSelector, createSelector } from "@ngrx/store";
//import { locations } from "./location.state";
import { locationModel } from "./location.model";


const getlocationstate=createFeatureSelector<locationModel>('location');

export const getLocation=createSelector(getlocationstate,(state)=>{
    return state;
})