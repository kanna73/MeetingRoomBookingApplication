import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'myDate' })
export class MyDatePipe implements PipeTransform {
  transform(value: string): string {
    const [hours, minutes] = value.split(':');
    const formattedTime = `${Number(hours) % 12 || 12}:${minutes} ${Number(hours) >= 12 ? 'PM' : 'AM'}`;
    return formattedTime;
  }
}


