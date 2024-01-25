import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'railwayTime'
})
export class RailwayTimePipe implements PipeTransform {
   
    constructor(private datePipe:DatePipe) {
        
    }
  transform(value: string ): string {
    // console.log("parameter "+value);
    const inputDate = new Date(`2000-01-01 ${value}`);
    const formattedTime = this.datePipe.transform(inputDate, 'h:mm:ss a') ?? '';
    // console.log("new time "+formattedTime);

    const [hours, minutes, seconds, meridian] = formattedTime.split(/[:\s]+/);

    let hourValue = parseInt(hours, 10);
    // console.log("hour value "+hourValue);
    // console.log("meridian"+ meridian);

    if (meridian === 'PM' && hourValue !== 12) {
      hourValue += 12;
    }
    // console.log("hour value "+hourValue);


    const formattedHour = hourValue.toString().padStart(2, '0');
    const formattedMinutes = minutes.padStart(2, '0');
    const formattedSeconds ='00';

    return `${formattedHour}:${formattedMinutes}:${formattedSeconds}`;
  }
}
