import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedApiService } from '../../../Service/shared-api.service';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { setToken } from '../../../shared/token.action';
import { AppModule } from '../../app.module';
import { loadLoaction, setLocation } from '../../../shared/Location/location.action';
import { getLocation } from '../../../shared/Location/loaction.selector';
import { locationModel } from '../../../shared/Location/location.model';
import { AppStateModel } from '../../../shared/Global/AppState.Model';
import { locations } from '../../../shared/Location/location.state';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { RegisterModel } from '../../../shared/Register/register.model';
import { registerRequest } from '../../../shared/Register/register.action';

@Component({
  selector: 'app-registerform',
  templateUrl: './registerform.component.html',
  styleUrl: './registerform.component.css'
})
export class RegisterformComponent implements OnInit {
  form:FormGroup;
  locations: any;
  anotherlocation :any;
  registerState$ ! :Observable<RegisterModel>;
  loactionState$ !:Observable<locations>

constructor(private formBuilder:FormBuilder,private apiservice:SharedApiService,
          private route:Router,private store:Store<AppStateModel>,private snackBar: MatSnackBar)
 {
  this.form=this.formBuilder.group({
    name:['',[Validators.required,this.customNameValidator]],
    empNo:['',[Validators.required,this.customEmpCode]],
    email:['',[Validators.required,this.customEmailValidator]],
    LocationId:['',Validators.required],
    userPassword:['',Validators.required]
  });
  this.registerState$ = store.pipe(select('register'));

}
  ngOnInit(){
  this.store.dispatch(loadLoaction()); 

   this.store.select(getLocation).subscribe((data)=>{
    this.locations=data;
  })
  
  }
  showAlert(message:string)
  {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }
 
  customEmailValidator(email:AbstractControl){
    const emailid=email.value;
    if (!emailid.toLowerCase().endsWith('kanini.com')) {
      return { 'invalidDomain': true };
    }
    return null;
  }

  customEmpCode(empNo:AbstractControl)
  {
    const empCode=empNo.value;
    const pattern= /^[1-9]\d{0,3}$/
    if(!pattern.test(empCode))
    {
      return { 'invalidEmpCode':true}
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

  customNameValidator(name:AbstractControl){
    const empname=name.value;
    const pattern =/^[a-zA-Z\s]*$/
    if(!pattern.test(empname))
    {
      return{ 'invalidName' : true }
    }
    return null;
  }
  get getname()
  {
    return this.form.get('name');
  }
  get getEmpno(){
    return this.form.get('empno');
  }
  get getEmail()
  {
    return this.form.get('email');
  }
  get getLocation(){
    return this.form.get('LocationId');
  }
  get getPassword()
  {
    return this.form.get('userPassword');
  }
  onSubmit(){
    if (this.form.valid){
    //console.log(this.form.value);

    this.store.dispatch(registerRequest({registerData:this.form.value}))
    this.registerState$.subscribe((data)=>{
      if(data.message!='')
      {
        this.showAlert("Registration successful");
        this.route.navigate(['/login'])  
      }
      else{
        if(data.errorID==409)
        {
          this.showAlert(data.errorMessage);
        }
        else{
          this.showAlert("Registration failed");
        }

      }
    })
    // this.apiservice.register(this.form.value).subscribe(
    //   (response)=>{
    //     this.showAlert("Registration successful");
    //     this.route.navigate(['/login'])   
    //   },
    //   (error) => {
    //     this.showAlert("Registration failed");
    //   }
    //   )
     }
    else{
      this.showAlert("Please fill in all the required fields.");
    }
  }
  login(){
    this.route.navigate(['/login'])
  }
  
}
