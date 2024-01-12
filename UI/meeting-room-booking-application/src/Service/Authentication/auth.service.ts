import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { tokenModel } from '../../shared/token.model';
import { setToken } from '../../shared/token.action';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLogged:Boolean=false
  loggedToken:string | undefined;

  constructor(private store:Store<{token:tokenModel}>) { }

  Login()
  {
     this.store.select('token').subscribe((data)=>{
        this.loggedToken=data.token
     })
     if(this.loggedToken!="")
     {
        this.isLogged=true
     }  
  }
  Logout()
  {
    const removeToken="";
    this.store.dispatch(setToken({value:removeToken}));
    this.isLogged=false;
  }
  IsAuthenticated(){
    return this.isLogged;
  }
}
