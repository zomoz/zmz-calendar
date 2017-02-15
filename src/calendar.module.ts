import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  CalendarDayComponent,
  CalendarMonthComponent,
  CalendarWeekDaysComponent,
  CalendarComponent
} from './components';

@NgModule({
  imports: [CommonModule],
  exports: [CalendarComponent],
  declarations: [
    CalendarDayComponent,
    CalendarMonthComponent,
    CalendarWeekDaysComponent,
    CalendarComponent
  ]
})
export class CalendarModule { }