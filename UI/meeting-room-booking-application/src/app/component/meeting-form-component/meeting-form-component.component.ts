

import { Component, OnInit, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { FormatTimeService } from '../../../Service/format-time-service.service';
import { SharedApiService } from '../../../Service/shared-api.service';
import { Observable, of } from 'rxjs';
import { AppStateModel } from '../../../shared/Global/AppState.Model';
import { Store, select } from '@ngrx/store';
import { booking } from '../../Interface/bookinInterface';
import { MatDatepicker, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { RailwayTimePipe } from '../../custom-pipes/RailwayTimePipe';
import { DatePipe } from '@angular/common';
import { Route, Router } from '@angular/router';
import { setBooking, setProfile, setView } from '../../../shared/Global/Render_redux/condition.action';
import { MyDatePipe } from '../../custom-pipes/MyDatePipe';
import { postRequest } from '../../../shared/BookMeeting/bookmeeting.action';
import { BookingPostState } from '../../../shared/BookMeeting/bookmeeting.model';
import { CheckModel } from '../../../shared/Check/check.model';
import { loadCheckRequest } from '../../../shared/Check/check.action';
import { roomList } from '../../../shared/Room/room.state';
import { loadRoomRequest } from '../../../shared/Room/room.action';
import { loadLoaction } from '../../../shared/Location/location.action';
import { getLocation } from '../../../shared/Location/loaction.selector';
import { jwtDecode } from 'jwt-decode';
import { DecodedToken } from '../../Interface/Itoken';

@Component({
  selector: 'app-meeting-form-component',
  templateUrl: './meeting-form-component.component.html',
  styleUrls: ['./meeting-form-component.component.css']
})
export class MeetingFormComponentComponent implements OnInit {
  meetingForm: FormGroup;
  locations : any;
  Rooms: any[] | undefined;
  id: number | undefined;
  requestData: booking | undefined;
  disableBookButton: boolean = true;
  minDate = new Date();
  minTime: string = ''; // Minimum allowed time
  maxTime: string = '23:59';
  minEndTime:string='';
  postState$ !:Observable<BookingPostState>;
  checkState$! :Observable<CheckModel>;
  roomState$! :Observable<roomList>;


  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    // private formatTimeService: FormatTimeService,
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
     this.postState$ = store.pipe(select('booking'));
     this.checkState$ = store.pipe(select('check'));
     this.roomState$ = store.pipe(select('room'));
  }

  ngOnInit() {
    this.store.dispatch(loadLoaction()); 
    this.store.select(getLocation).subscribe((data)=>{
     this.locations=data;
   })
    // this.store.select('token').subscribe((data) => {
    //   this.meetingForm.patchValue({ userId: data.id });
    //   this.id = data.id;
    // })
    const token = sessionStorage.getItem('token') ||''
    const decodedToken = jwtDecode(token) as DecodedToken;  
    this.id=decodedToken.nameid                

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
      const date = new Date(`2024-01-01 ${startTime.value}`);
      this.minEndTime = this.datePipe.transform(date, 'HH:mm') ?? '';
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
    return null;
  }

  get endTimes() {
    return this.meetingForm.get('endTime');
  }

  get startTimes() {
    return this.meetingForm.get('startTime');
  }


  changeRequestFormat(): any {
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
    console.log("formated data" + this.requestData)
    return (this.requestData);
  }

  showAlert(message:string)
  {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }

   check() {
    debugger;
    if (this.meetingForm.valid) {
      console.log("data from component ",this.changeRequestFormat())
      this.store.dispatch(loadCheckRequest({requestData:this.changeRequestFormat()}));
      this.checkState$.subscribe((checkState)=>{
        this.disableBookButton = !checkState.valid;
        if(checkState.valid)
        {
          this.showAlert("this meeting room is available");
        }
        else{
          this.showAlert("this meeting room is unavailable");
        }
      })  
    } else {
      this.showAlert("Please fill in all the required fields");
    }
  }

 
  onLocationSelected(event: any): void {
    const selectedLocationId = event.value;
    this.store.dispatch(loadRoomRequest({Id:selectedLocationId}));
    this.roomState$.subscribe((data)=>{
        if(data.error=='')
        {
          this.Rooms = data.roomlist;
        }
    })
  }
  postData() {
    console.log("data submit",this.changeRequestFormat())
    const book= this.changeRequestFormat();
    this.store.dispatch(postRequest({data:book}));
    this.postState$.subscribe((poststate) =>{
      console.log("post ",poststate);
      if(poststate.message!='')
      {
        console.log("the success ",poststate.message);
        console.log("the fail ",poststate.error)
        this.disableBookButton = false;
        this.resetForm();
        this.store.dispatch(setProfile({value:false}));
        this.store.dispatch(setBooking({value:false}));
        this.store.dispatch(setView({value:true}));
        this.showAlert("Form submitted successfully!");
      }
      if(poststate.error!='')
      {
        console.log("the success ",poststate.message);
        console.log("the fail ",poststate.error)
        this.showAlert(" error occured");
      }
    })
  }
  submitForm() {
    if (this.meetingForm.valid) {
      this.postData();
    } else {
      this.showAlert('Please fill in all the required fields.');
    }
  }
}


