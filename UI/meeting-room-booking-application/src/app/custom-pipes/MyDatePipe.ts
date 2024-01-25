import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'myDate' })
export class MyDatePipe implements PipeTransform {
  transform(value: string): string {
    // Assuming value is in the format 'HH:mm:ss'
    const [hours, minutes] = value.split(':');
    const formattedTime = `${Number(hours) % 12 || 12}:${minutes} ${Number(hours) >= 12 ? 'PM' : 'AM'}`;
    return formattedTime;
  }
}


