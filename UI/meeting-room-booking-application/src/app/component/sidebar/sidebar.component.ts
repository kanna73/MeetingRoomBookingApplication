import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';
import { AppStateModel } from '../../../shared/Global/AppState.Model';
import { Store } from '@ngrx/store';
import { setBooking, setProfile, setSide, setView } from '../../../shared/Global/Render_redux/condition.action';
import { AuthService } from '../../../Service/Authentication/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {

 
  constructor(private store:Store<AppStateModel>,
              private auth:AuthService,
              private route:Router,
              private renderer: Renderer2
              ) {
    
  }
  ngOnInit(){
  }

  logout()
  {
     this.auth.Logout();
    this.route.navigate(['/login'])
  }
  
  Profile(){
    this.store.dispatch(setProfile({value:true}));
    this.store.dispatch(setBooking({value:false}));
    this.store.dispatch(setView({value:false}));
  }
  Booking()
  {
    this.store.dispatch(setProfile({value:false}));
    this.store.dispatch(setBooking({value:true}));
    this.store.dispatch(setView({value:false}));
    
  }
  viewMeeting(){
    this.store.dispatch(setProfile({value:false}));
    this.store.dispatch(setBooking({value:false}));
    this.store.dispatch(setView({value:true})); 
  }
 
  
}
