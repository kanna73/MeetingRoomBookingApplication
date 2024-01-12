import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedApiService } from '../../../Service/shared-api.service';
import { Store } from '@ngrx/store';
import { jwtDecode } from "jwt-decode";
import { tokenModel } from '../../../shared/token.model';
import { DecodedToken } from '../../Interface/Itoken';
import { setEmail, setName, setToken } from '../../../shared/token.action';
import { Router } from '@angular/router';
import { AuthService } from '../../../Service/Authentication/auth.service';
import { AppStateModel } from '../../../shared/Global/AppState.model';


@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrl: './loginform.component.css'
})
export class LoginformComponent implements OnInit {
  myForm:FormGroup;
  token:string | undefined;

  constructor(private formBuilder: FormBuilder,private apiService:SharedApiService,
    private store:Store<AppStateModel>,private route:Router,private authservice:AuthService) {
    this.myForm = this.formBuilder.group({
      email: ['', [Validators.required,this.customEmailValidator]],
      userPassword: ['', Validators.required]
    });
  }
  ngOnInit(){
    this.store.select('token').subscribe((data)=>{
        this.token=data.token;
    })
    console.log(this.token)
  }
  

  get emails()
  {
    return this.myForm.get('email');
  }
  get password()
  {
    return this.myForm.get('userPassword');
  }
  customEmailValidator(email:AbstractControl){
    const emailid=email.value;
    if (!emailid.toLowerCase().endsWith('kanini.com')) {
      return { 'invalidDomain': true };
    }
    return null;
  }

  onSubmit() {
   try {
     if (this.myForm.valid){
      this.apiService.authenticateUser(this.myForm.value).subscribe(  
        (response) => {
          this.store.dispatch(setToken({value:response.token}))
          const decodedToken=jwtDecode(response.token)as DecodedToken;
          this.store.dispatch(setName({value:decodedToken.unique_name}));
          this.store.dispatch(setEmail({value:decodedToken.email}));
          this.authservice.Login();
          alert('Authentication successful'); 
          this.route.navigate(['/home'])    
        },
        (error) => {
          console.error('POST error', error);
          alert('Authentication failed');
        }
      );
      console.log(this.myForm.value);
        }
        else{
          alert('Please fill in all the required fields.');
        }
    } catch (ex) {
      console.error('Exception caught', ex);
      alert('An unexpected error occurred');
    }
}
}

