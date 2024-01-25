// format-time.service.ts

import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class FormatTimeService {
  constructor(private datePipe: DatePipe) {}

  formatToRailwayTime(time: string): string {
    // Split the input time into hours and minutes
    const [hours, minutes] = time.split(':');
  
    // Create a new Date object with a fixed date (1970-01-01) and the specified time
    const parsedTime = new Date(1970, 0, 1, parseInt(hours, 10), parseInt(minutes, 10));
  
    // Check if the parsed time is a valid date
    if (isNaN(parsedTime.getTime())) {
      console.error(`Invalid date for input time: ${time}`);
      return '00:00:00'; // or handle the error in a way that makes sense for your application
    }
  
    // Use non-null assertion operator (!) to assert that the result is not null
    return this.datePipe.transform(parsedTime, 'HH:mm:ss')!;
  }
}
