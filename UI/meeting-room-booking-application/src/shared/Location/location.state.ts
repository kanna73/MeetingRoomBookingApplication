import {locationModel} from './location.model';


export interface locations{
    locationList:locationModel[],
    ErrorID:number,
    ErrorMessage:string
    }
export const locationState:locations={
    locationList:[],
    ErrorID:0,
    ErrorMessage:''
}