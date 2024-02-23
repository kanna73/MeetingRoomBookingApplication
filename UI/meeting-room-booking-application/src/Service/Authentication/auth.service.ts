// import { Injectable } from '@angular/core';
// import { Store } from '@ngrx/store';
// import { tokenModel } from '../../shared/token.model';
// import { setToken } from '../../shared/token.action';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   isLogged:Boolean=false
//   loggedToken:string | undefined;

//   constructor(private store:Store<{token:tokenModel}>) { }

//   Login()
//   {
//      this.store.select('token').subscribe((data)=>{
//         this.loggedToken=data.token
//      })
//      if(sessionStorage.getItem("token")!="")
//      {
//         this.isLogged=true
//      }  
//   }
//   Logout()
//   {
//     const removeToken="";
//     this.store.dispatch(setToken({value:removeToken}));
//     this.isLogged=false;
//   }
//   IsAuthenticated(){
//     return this.isLogged;
//   }
// }


import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { tokenModel } from '../../shared/token.model';
import { setToken } from '../../shared/token.action';
import { AppStateModel } from '../../shared/Global/AppState.Model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLogged: boolean = sessionStorage.getItem('token') !== null;
  loggedToken: string | undefined;

  constructor(private store: Store<AppStateModel>) { }

  Login() {
    this.store.select('token').subscribe((data) => {
      this.loggedToken = data.token;
    });

    if (sessionStorage.getItem('token') !== null) {
      this.isLogged = true;
    }
  }

  Logout() {
    const removeToken = '';
    this.store.dispatch(setToken({ value: removeToken }));
    this.isLogged = false;
    sessionStorage.removeItem('token');
  }

  IsAuthenticated() {
    return this.isLogged;
  }
}
