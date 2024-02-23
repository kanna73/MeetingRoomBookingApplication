import {  createFeatureSelector, createSelector } from "@ngrx/store";
import { conditionModel } from "./condition.model";

const getConditionstate =createFeatureSelector<conditionModel>('condition');

export const gettodaymeeting = createSelector(getConditionstate,(state)=>{
    return state.view
})