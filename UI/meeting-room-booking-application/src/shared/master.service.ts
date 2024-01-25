import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { locationModel } from './Location/location.model';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http : HttpClient) { }

  getallLocation():Observable<locationModel[]>{
    return this.http.get<locationModel[]>("https://localhost:7275/api/locations");
  }
}
