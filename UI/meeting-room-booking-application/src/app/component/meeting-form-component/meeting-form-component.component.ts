

import { Component, OnInit, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormatTimeService } from '../../../Service/format-time-service.service';
import { SharedApiService } from '../../../Service/shared-api.service';
import { of } from 'rxjs';
import { AppStateModel } from '../../../shared/Global/AppState.Model';
import { Store } from '@ngrx/store';
import { booking } from '../../Interface/bookinInterface';
import { MatDatepicker, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { RailwayTimePipe } from '../../custom-pipes/RailwayTimePipe';
import { DatePipe } from '@angular/common';
import { Route, Router } from '@angular/router';
import { setBooking, setProfile, setView } from '../../../shared/Global/Render_redux/condition.action';
import { MyDatePipe } from '../../custom-pipes/MyDatePipe';

@Component({
  selector: 'app-meeting-form-component',
  templateUrl: './meeting-form-component.component.html',
  styleUrls: ['./meeting-form-component.component.css']
})
export class MeetingFormComponentComponent implements OnInit {
  meetingForm: FormGroup;
  locations: any[] | undefined;
  Rooms: any[] | undefined;
  id: number | undefined;
  requestData: booking | undefined;
  disableBookButton: boolean = true;
  minDate = new Date();
  minTime: string = ''; // Minimum allowed time
  maxTime: string = '23:59';
  minEndTime:string='';


  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private formatTimeService: FormatTimeService,
    private apiservice: SharedApiService,
    private store: Store<AppStateModel>,
    private railwayTimePipe: RailwayTimePipe,
    private datePipe: DatePipe,
    private route:Router,
  ) {
    this.meetingForm = this.fb.group({
      meetingTitle: ['', Validators.required],
      location: ['', Validators.required],
      meetingRoom: ['', Validators.required],
      startTime: ['', Validators.required,this.startTimeValidator],
      endTime: ['', Validators.required, this.endTimeValidator],
      userId: [0],
      bookdate: ['', Validators.required]
    });
     
    
  }

  ngOnInit() {
    this.apiservice.getLocation().subscribe((data) => {
      this.locations = data;
    });
    this.store.select('token').subscribe((data) => {
      this.meetingForm.patchValue({ userId: data.id });
      this.id = +data.id;
    })
    
    
  }
  resetForm() {
    this.meetingForm.reset({
      meetingTitle: '',
      location: '',
      meetingRoom: '',
      startTime: '',
      endTime: '',
      userId: 0,
      bookdate: ''
    });
  }

  
  onDateSelected(event: MatDatepickerInputEvent<Date>) {
    const today = new Date();
    const formatedCurrentDate= this.datePipe.transform(today, 'yyyy-MM-dd');
    const selectedDate= this.datePipe.transform(this.meetingForm.value.bookdate,'yyyy-MM-dd');
    if(formatedCurrentDate==selectedDate)
    {
      const CurrentTime =this.datePipe.transform(today, 'HH:mm') ?? '';
      this.minTime=CurrentTime;
    }
    else{
      this.minTime='12:00 AM';

    }
    
    
  }
  
  private isPastDateTime=(startTime: AbstractControl)=>{
    const today = new Date();
    // const formatedCurrentDate= this.datePipe.transform(today, 'yyyy-MM-dd');
    // const selectedDate= this.datePipe.transform(this.meetingForm.value.bookdate,'yyyy-MM-dd');
    

      const date = new Date(`2024-01-01 ${startTime.value}`);
      this.minEndTime = this.datePipe.transform(date, 'HH:mm') ?? '';
      // console.log("min end time "+this.minEndTime);
  
      // const CurrentTime =this.datePipe.transform(today, 'HH:mm:ss') ?? '';
      // const formatedCurrentTime = this.railwayTimePipe.transform(CurrentTime);
     
      //const selectedStartTime =this.railwayTimePipe.transform(startTime.value);
   
   
  }
  dateFilter = (date: Date | null): boolean => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); 
    return !date || date >= currentDate;
  };
 
  formatDate(selectedDate: Date): string {
    return this.datePipe.transform(selectedDate, 'yyyy-MM-dd') || '';
  }
  openDatePicker(datepicker: MatDatepicker<any>): void {
    datepicker.open();
  }
  startTimeValidator=(startTime:AbstractControl)=>{
     return of(this.isPastDateTime(startTime));
  }

  endTimeValidator = (endTime: AbstractControl) => {
    return of(this.validateEndTime(endTime));
  };

  private validateEndTime(endTime: AbstractControl): ValidationErrors | null {
    const EndTime = endTime.value;
    const startTime = this.meetingForm.get('startTime')?.value;


    const formattedStartTime = this.railwayTimePipe.transform(startTime);
    const formattedEndTime = this.railwayTimePipe.transform(EndTime);
    if (formattedEndTime <= formattedStartTime) {
      return { 'invalidEndTime': true };
    }

   // console.log('if not working');

    return null;
  }

  get endTimes() {
    return this.meetingForm.get('endTime');
  }

  get startTimes() {
    return this.meetingForm.get('startTime');
  }


  changeRequestFormat(): booking {
    const formValue = this.meetingForm.value;
    const { location, ...formValuesWithoutLocation } = formValue;

    this.requestData = {
      meetingId: formValuesWithoutLocation.meetingRoom || 0,
      meetingTitle: formValuesWithoutLocation.meetingTitle || '',
      startTime: this.railwayTimePipe.transform(this.meetingForm.value.startTime) || '',
      endTime: this.railwayTimePipe.transform(this.meetingForm.value.endTime) || '',
      userId: this.id || 0,
      bookDate: this.formatDate(this.meetingForm.value.bookdate) || ''
    };
   // console.log("formated data" + this.requestData.endTime)
    return (this.requestData);
  }

  showAlert(message:string)
  {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }

   check() {
   // console.log('Form submitted:', this.meetingForm.value);
    if (this.meetingForm.valid) {
      const sendData = this.changeRequestFormat();
      //console.log("send data" + sendData);
      this.apiservice.checkAvailablity(sendData).subscribe((data) => {
       // console.log('result:' + data);
        this.disableBookButton = !data;
        if(data)
        {
          this.showAlert("this meeting room is available");
        }
        else{
          this.showAlert("this meeting room is unavailable");
        }
      });
     
    } else {
      this.showAlert("Please fill in all the required fields");
    }
  }

 
  onLocationSelected(event: any): void {
    const selectedLocationId = event.value;
   // console.log('Selected Location ID:', selectedLocationId);
    this.apiservice.getMeetingRoom(selectedLocationId).subscribe((data) => {
      this.Rooms = data;
    });
  }
  postData() {
   // console.log("working")
    this.apiservice.addBooking(this.changeRequestFormat()).subscribe((data) => {
      if (data != null) {
        //console.log(data);
        this.disableBookButton = false;
        this.resetForm();
        this.store.dispatch(setProfile({value:false}));
        this.store.dispatch(setBooking({value:false}));
        this.store.dispatch(setView({value:true}));
        this.showAlert("Form submitted successfully!");

      }
    })
  }
  submitForm() {
    if (this.meetingForm.valid) {
     // console.log('Form submitted:', this.changeRequestFormat());
      this.postData();
      this.showAlert('Form submitted successfully!');
    } else {
      this.showAlert('Please fill in all the required fields.');
    }
  }
}


