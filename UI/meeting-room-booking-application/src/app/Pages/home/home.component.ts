import { Component, OnInit } from '@angular/core';
import { AppStateModel } from '../../../shared/Global/AppState.Model';
import { AuthService } from '../../../Service/Authentication/auth.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  display:any

  constructor(private store:Store<AppStateModel>,private auth:AuthService) {
    
  }
  ngOnInit() {
    this.store.select('condition').subscribe((data)=>{
      this.display=data;  
    })
  }
  logout()
  {
    this.auth.Logout();
  }
}
