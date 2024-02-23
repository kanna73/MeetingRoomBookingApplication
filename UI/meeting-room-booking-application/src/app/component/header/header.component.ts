import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppStateModel } from '../../../shared/Global/AppState.Model';
import { AuthService } from '../../../Service/Authentication/auth.service';
import { Router } from '@angular/router';
import { setSide } from '../../../shared/Global/Render_redux/condition.action';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  
  
  constructor(private auth:AuthService,
              private route:Router,
              ) {
    
  }
 
  logout()
  {
     this.auth.Logout();
    this.route.navigate(['/login'])
  }
 

}
