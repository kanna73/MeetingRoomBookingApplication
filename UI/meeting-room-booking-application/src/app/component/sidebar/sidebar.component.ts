import { Component } from '@angular/core';
import { AppStateModel } from '../../../shared/Global/AppState.Model';
import { Store } from '@ngrx/store';
import { setBooking, setProfile, setView } from '../../../shared/Global/Render_redux/condition.action';
import { AuthService } from '../../../Service/Authentication/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
 
  constructor(private store:Store<AppStateModel>,private auth:AuthService,private route:Router) {
    
  }

  logout()
  {
     this.auth.Logout();
    this.route.navigate(['/login'])
  }
  Profile(){
   // console.log("working")
    this.store.dispatch(setProfile({value:true}));
    this.store.dispatch(setBooking({value:false}));
    this.store.dispatch(setView({value:false}));
  }
  Booking()
  {
//console.log("booking");
    this.store.dispatch(setProfile({value:false}));
    this.store.dispatch(setBooking({value:true}));
    this.store.dispatch(setView({value:false}));
  }
  viewMeeting(){
   // console.log("today's booking");
    this.store.dispatch(setProfile({value:false}));
    this.store.dispatch(setBooking({value:false}));
    this.store.dispatch(setView({value:true}));
  }
}
