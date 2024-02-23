import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { locationModel } from './Location/location.model';
import { todayMeeting } from './TodayMeeting/todaymeeting.model';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http : HttpClient) { }

  getallLocation():Observable<locationModel[]>{
    return this.http.get<locationModel[]>("https://localhost:7275/api/locations");
  }

  getLoactionByID(id:number):Observable<locationModel[]>{
    const url =`https://localhost:7275/api/getLoactionByID?id=${id}`
    return this.http.get<locationModel[]>(url);
  }

  public addBooking(data:any):Observable<any>{
    return this.http.post("https://localhost:7275/api/meeting",data);
  }

  public authenticateUser(data:any):Observable<any>{
    return this.http.post<any>("https://localhost:7275/api/authenticateUser",data)
  }
  public getTodayMeeting():Observable<todayMeeting[]>{
    return this.http.get<todayMeeting[]>("https://localhost:7275/api/getTodayMeeting")
  }

  public checkAvailablity(data:any):Observable<any>{
    return this.http.post("https://localhost:7275/api/validateMeeting",data);
  }

  public getMeetingRoom(LocationId:number):Observable<any>{
    const url = `https://localhost:7275/api/meetingRooms?locationID=${LocationId}`;
    return this.http.get(url);
  }
  public register(data:any):Observable<any>{
    return this.http.post("https://localhost:7275/api/registerUser",data)
  }

}
