import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { RegistrationComponent } from './Pages/registration/registration.component';
import { HomeComponent } from './Pages/home/home.component';
import { CanActivate } from '../Service/Authentication/auth.guard';
import { MeetingFormComponentComponent } from './component/meeting-form-component/meeting-form-component.component';
import { HeaderComponent } from './component/header/header.component';

const routes: Routes = [
  {path:"",component:RegistrationComponent},
  {path:"login",component:LoginComponent},
  {path:"home",component:HomeComponent,canActivate:[CanActivate]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
