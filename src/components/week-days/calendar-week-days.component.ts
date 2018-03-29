import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Theme } from '../../types';
import { startOfWeek, endOfWeek, eachDay, format } from 'date-fns';

@Component({
  selector: 'zmz-calendar-week-days',
  templateUrl: './calendar-week-days.component.html',
  styleUrls: [ './calendar-week-days.component.css' ]
})
export class CalendarWeekDaysComponent implements OnInit {
  @Input() clickable: boolean;
  @Input() theme: Theme = 'form';
  @Output() weekday: EventEmitter<number> = new EventEmitter<number>();

  weekDays: string[];
  ngOnInit() {
    const today = new Date();
    const weekArray = eachDay(startOfWeek(today), endOfWeek(today))
    switch (this.theme){
      case 'show': {
        this.weekDays = weekArray.map(d => format(d, 'dd'));
        break;
      }
      
      /** Default case is theme === 'form' */
      default:
        this.weekDays = weekArray.map(d => format(d, 'ddd'));
        break;
    }
  }

  weekDaySelect(day: number) {
    if (this.clickable) {
      this.weekday.emit(day);
    }
  }
}