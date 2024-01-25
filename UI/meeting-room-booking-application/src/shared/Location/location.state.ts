import {locationModel} from './location.model';


export interface locations{
    locationList:locationModel[],
    ErrorText:string,
    }
export const locationState:locations={
    locationList:[],
    ErrorText:''
}