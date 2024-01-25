import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginformComponent } from './component/loginform/loginform.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../Material.module';
import { CoverimageComponent } from './component/coverimage/coverimage.component';
import { RegisterformComponent } from './component/registerform/registerform.component';
import { RegistrationComponent } from './Pages/registration/registration.component';
import { StoreModule } from '@ngrx/store';
import { tokenReducer } from '../shared/token.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HomeComponent } from './Pages/home/home.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { HeaderComponent } from './component/header/header.component';
import { AppState } from '../shared/Global/App.state';
import { MeetingFormComponentComponent } from './component/meeting-form-component/meeting-form-component.component';
import { CommonModule, DatePipe } from '@angular/common';
import { ProfileComponent } from './component/profile/profile.component';
import { ViewComponent } from './component/view/view.component';
import { RailwayTimePipe } from './custom-pipes/RailwayTimePipe';
import { EffectsModule } from '@ngrx/effects';
import { LocationEffects } from '../shared/Location/location.Effects';
import { MyDatePipe } from './custom-pipes/MyDatePipe';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginformComponent,
    CoverimageComponent,
    RegisterformComponent,
    RegistrationComponent,
    HomeComponent,
    SidebarComponent,
    HeaderComponent,
    MeetingFormComponentComponent,
    ProfileComponent,
    ViewComponent,
    
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    CommonModule,
    StoreModule.forRoot(AppState),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([LocationEffects])

    
  ],
  providers: [DatePipe,RailwayTimePipe,MyDatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
