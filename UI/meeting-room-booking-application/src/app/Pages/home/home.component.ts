import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';
import { AppStateModel } from '../../../shared/Global/AppState.Model';
import { AuthService } from '../../../Service/Authentication/auth.service';
import { Store } from '@ngrx/store';
import { setSide } from '../../../shared/Global/Render_redux/condition.action';
import { gettodaymeeting } from '../../../shared/Global/Render_redux/condition.selector';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  display:any;
  isSideBar!:boolean;

  constructor(private store:Store<AppStateModel>,
              private auth:AuthService,
              private renderer: Renderer2
              ) 
  {
    
  }
  ngOnInit() {
    this.store.select('condition').subscribe((data)=>{
      this.display=data;
    })
    this.store.select(gettodaymeeting).subscribe((data)=>{
      console.log("meeting condition ",data)
    })
  }


  logout()
  {
    this.auth.Logout();
  }
}
