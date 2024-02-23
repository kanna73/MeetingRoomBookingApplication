import { createFeatureSelector, createSelector } from "@ngrx/store";
import { locations } from "./location.state";


const getlocationstate=createFeatureSelector<locations>('location');

export const getLocation=createSelector(getlocationstate,(state)=>{
    return state.locationList;
})