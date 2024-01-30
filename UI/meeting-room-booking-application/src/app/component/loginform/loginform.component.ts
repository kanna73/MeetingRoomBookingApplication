import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedApiService } from '../../../Service/shared-api.service';
import { Store, select } from '@ngrx/store';
import { jwtDecode } from "jwt-decode";
import { tokenModel } from '../../../shared/token.model';
import { DecodedToken } from '../../Interface/Itoken';
import { setEmail, setId, setName, setToken } from '../../../shared/token.action';
import { Router } from '@angular/router';
import { AuthService } from '../../../Service/Authentication/auth.service';
import { AppStateModel } from '../../../shared/Global/AppState.Model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginState } from '../../../shared/Login/login.model';
import { Observable } from 'rxjs';
import { loginRequest } from '../../../shared/Login/login.action';


@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrl: './loginform.component.css'
})
export class LoginformComponent implements OnInit {
  myForm: FormGroup;
  token: string | undefined;
  loginPostState$ !:Observable<LoginState>

  constructor(private formBuilder: FormBuilder, private apiService: SharedApiService,
    private store: Store<AppStateModel>, private route: Router, private authservice: AuthService, private snackBar: MatSnackBar,) {
    this.myForm = this.formBuilder.group({
      email: ['', [Validators.required, this.customEmailValidator]],
      userPassword: ['', Validators.required]
    });
    this.loginPostState$=store.pipe(select('login'))
  }
  ngOnInit() {
    this.store.select('token').subscribe((data) => {
      this.token = data.token;
    })
    console.log(this.token)
  }

  showAlert(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }

  get emails() {
    return this.myForm.get('email');
  }
  get password() {
    return this.myForm.get('userPassword');
  }
  customEmailValidator(email: AbstractControl) {
    const emailid = email.value;
    if (!emailid.toLowerCase().endsWith('kanini.com')) {
      return { 'invalidDomain': true };
    }
    return null;
  }
  register() {
    this.route.navigate([''])
  }

  onSubmit() {
    try {
      if (this.myForm.valid) {
        // this.apiService.authenticateUser(this.myForm.value).subscribe(
        //   (response) => {
        //     this.store.dispatch(setToken({ value: response.token }))
        //     const decodedToken = jwtDecode(response.token) as DecodedToken;
        //     sessionStorage.setItem("token", response.token)
        //     this.store.dispatch(setName({ value: decodedToken.unique_name }));
        //     this.store.dispatch(setEmail({ value: decodedToken.email }));
        //     this.store.dispatch(setId({ value: decodedToken.nameid }));
        //     this.authservice.Login();
        //     this.showAlert("Authentication successful");
        //     this.route.navigate(['/home'])
        //   },
        //   (error) => {
        //     this.showAlert('Authentication failed');
        //   }
        // );
        this.store.dispatch(loginRequest({data:this.myForm.value}));
        this.loginPostState$.subscribe((loginstate)=>{
              console.log("login state ",loginstate)
              if(loginstate.token!='')
              {
                    
                    const decodedToken = jwtDecode(loginstate.token) as DecodedToken;
                    sessionStorage.setItem("token", loginstate.token)
                    this.store.dispatch(setName({ value: decodedToken.unique_name }));
                    this.store.dispatch(setEmail({ value: decodedToken.email }));
                    this.store.dispatch(setId({ value: decodedToken.nameid }));
                    this.authservice.Login();
                    this.showAlert("Authentication successful");
                    this.route.navigate(['/home'])
              }
              else{
                if(loginstate.ID==404)
                {
                  this.showAlert(loginstate.Message);
                }
                else{
                  this.showAlert("Authentication failed");
                }
              }
        })
      }
      else {
        this.showAlert('Please fill in all the required fields.');

      }
    } catch (ex) {
      this.showAlert('An unexpected error occurred');
    }
  }
}

