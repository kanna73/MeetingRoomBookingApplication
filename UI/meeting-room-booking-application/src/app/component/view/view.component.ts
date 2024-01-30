// import { Component, OnInit } from '@angular/core';
// import { Meeting } from '../../Interface/Meeting';
// import { SharedApiService } from '../../../Service/shared-api.service';
// import { MyDatePipe } from '../../custom-pipes/MyDatePipe';

// @Component({
//   selector: 'app-view',
//   templateUrl: './view.component.html',
//   styleUrl: './view.component.css'
// })
// export class ViewComponent implements OnInit {


//   todayMeeting:any[] =[]
//   constructor(
//     private apiService:SharedApiService,
//     private normalTimePipe:MyDatePipe
//     ) {

    
//   }
//   ngOnInit() {
//     this.apiService.getTodayMeeting().subscribe((response)=>{
//       this.todayMeeting=response;
//       console.log(this.todayMeeting)
//     })
//   }
//   parseAndFormatTime(timeString: string): string {
//     return this.normalTimePipe.transform(timeString);
//   }
// }


// view.component.ts

import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedApiService } from '../../../Service/shared-api.service';
import { MyDatePipe } from '../../custom-pipes/MyDatePipe';
import { MatPaginator } from '@angular/material/paginator';
import { AppStateModel } from '../../../shared/Global/AppState.Model';
import { Store, select } from '@ngrx/store';
import { loadMeeting } from '../../../shared/TodayMeeting/todaymeeting.action';
import { Observable } from 'rxjs';
import { todayMeetingList } from '../../../shared/TodayMeeting/todaymeeting.state';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']  // Fix the typo in styleUrls
})
export class ViewComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  todayMeeting: any[] = [];
  pagedMeetings: any[] = [];
  pageSize = 6;
  meetingState$! :Observable<todayMeetingList>


  constructor(
    private apiService: SharedApiService,
    private normalTimePipe: MyDatePipe,
    private store:Store<AppStateModel>
  ) {}

  ngOnInit() {
    // this.apiService.getTodayMeeting().subscribe((response) => {
    //   this.todayMeeting = response;
    //   console.log(response)
    //   this.onPageChange({ pageIndex: 0, pageSize: this.pageSize }); 
    // });
    this.meetingState$ = this.store.pipe(select('meeting'))
     this.GetTodayMeeting();
  }

  GetTodayMeeting(){
    this.store.dispatch(loadMeeting());
      this.meetingState$.subscribe((data)=>{
      console.log("data ",data.meetingList);
      if(data.meetingList)
      {
        this.todayMeeting =data.meetingList
        this.onPageChange({ pageIndex: 0, pageSize: this.pageSize }); 
      }
      else{
        alert("error occured");
      }
    })

  }

  onPageChange(event: any) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.pagedMeetings = this.todayMeeting.slice(startIndex, endIndex);
  }

  parseAndFormatTime(timeString: string): string {
    return this.normalTimePipe.transform(timeString);
  }
}
