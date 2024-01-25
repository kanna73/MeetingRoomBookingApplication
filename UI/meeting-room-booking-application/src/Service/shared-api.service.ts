import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedApiService {

  constructor(private api:HttpClient) { }

  public authenticateUser(data:any):Observable<any>{
    return this.api.post<any>("https://localhost:7275/api/authenticateUser",data)
  }
  
  public getLocation():Observable<any>{
    return this.api.get("https://localhost:7275/api/locations");
  }

  public register(data:any):Observable<any>{
    return this.api.post("https://localhost:7275/api/registerUser",data)
  }

  public getMeetingRoom(LocationId:number):Observable<any>{
    const url = `https://localhost:7275/api/meetingRooms?locationID=${LocationId}`;
    return this.api.get(url);
  }

  public checkAvailablity(data:any):Observable<any>{
    return this.api.post("https://localhost:7275/api/validateMeeting",data);
  }

  public addBooking(data:any):Observable<any>{
    return this.api.post("https://localhost:7275/api/meeting",data);
  }

  public getTodayMeeting():Observable<any>{
    return this.api.get("https://localhost:7275/api/getTodayMeeting")
  }
}
