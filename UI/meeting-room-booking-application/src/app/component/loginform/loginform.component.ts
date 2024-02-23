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

  constructor(private formBuilder: FormBuilder,
              private apiService: SharedApiService,
              private store: Store<AppStateModel>,
              private route: Router, 
              private authservice: AuthService, 
              private snackBar: MatSnackBar,) 
  {
    
    this.myForm = this.formBuilder.group({
      email: ['', [Validators.required, this.customEmailValidator]],
      userPassword: ['', [Validators.required,this.customPassword]]
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
      panelClass: 'custom-snackbar'
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
  customPassword(userPassword:AbstractControl)
  {
    const password=userPassword.value;
    const pattern =/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{6,}$/;
    if(!pattern.test(password))
    {
      return {'invalidPassword':true}
    }
    return null;
  }
  register() {
    this.route.navigate([''])
  }

  TokenDecoder(token:string){
                    
    const decodedToken = jwtDecode(token) as DecodedToken;                 
    sessionStorage.setItem("token", token);
    this.store.dispatch(setName({ value: decodedToken.unique_name })); 
    this.store.dispatch(setEmail({ value: decodedToken.email }));  
    this.store.dispatch(setId({ value: decodedToken.nameid }));
  }

  onSubmit() {
      if (this.myForm.valid) {
        this.store.dispatch(loginRequest({data:this.myForm.value}));
        this.loginPostState$.subscribe((loginstate)=>{
              console.log("login state ",loginstate)
              if(loginstate.token!='')
              {  
                this.TokenDecoder(loginstate.token);
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
  }
}

