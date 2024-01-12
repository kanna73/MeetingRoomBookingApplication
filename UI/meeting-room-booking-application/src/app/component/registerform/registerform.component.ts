import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedApiService } from '../../../Service/shared-api.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { setToken } from '../../../shared/token.action';

@Component({
  selector: 'app-registerform',
  templateUrl: './registerform.component.html',
  styleUrl: './registerform.component.css'
})
export class RegisterformComponent implements OnInit {
  form:FormGroup;
  locations: any[] | undefined;

constructor(private formBuilder:FormBuilder,private apiservice:SharedApiService,
          private route:Router)
 {
  this.form=this.formBuilder.group({
    empName:['',Validators.required],
    empNo:['',Validators.required],
    email:['',Validators.required],
    LocationId:['',Validators.required],
    userPassword:['',Validators.required]

  });
}
  ngOnInit(){
   this.apiservice.getLocation().subscribe((data)=>{
    this.locations=data;
   })
   console.log(this.locations);
  }

  get getEmpname()
  {
    return this.form.get('empName');
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
    console.log(this.form.value);
    this.apiservice.register(this.form.value).subscribe(
      (response)=>{
        console.log(response);
        alert('Registration successful');     
      },
      (error) => {
        console.error('POST error', error);
        alert('Registration failed');
      }
      )
    }
    else{
      alert('Please fill in all the required fields.');
    }
  }
  login(){
    this.route.navigate(['/login'])

  }
  
}
