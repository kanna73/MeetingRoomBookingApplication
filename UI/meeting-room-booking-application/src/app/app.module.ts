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
import { BookingComponent } from './component/booking/booking.component';
import { AppState } from '../shared/Global/App.state';

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
    BookingComponent,
    
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    StoreModule.forRoot(AppState),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),

    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
