import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { Theme } from '../../types';

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
    switch (this.theme){
      case 'show':
        this.weekDays = moment.weekdaysShort(true).map((day: string) => 
          `${day.charAt(0).toUpperCase()}`
        );
        break;
      
      /** Default case is theme === 'form' */
      default:
        this.weekDays = moment.weekdaysShort(true).map((day: string) => 
          `${day.charAt(0).toUpperCase()}${day.slice(1).slice(0, -1)}`
        );
        break;
    }
  }

  weekDaySelect(day: number) {
    if (this.clickable) {
      this.weekday.emit(day);
    }
  }
}