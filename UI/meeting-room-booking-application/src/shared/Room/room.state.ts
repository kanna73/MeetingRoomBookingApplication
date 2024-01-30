import { room } from "./room.model";

export interface roomList{
    roomlist:room[],
    error:string
}

export const initialState:roomList={
    roomlist:[],
    error:''
}