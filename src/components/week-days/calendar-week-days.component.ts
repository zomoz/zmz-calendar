import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LOCALES } from '../../locales';
import { Theme, CalendarLocale } from '../../types';
import { startOfWeek, endOfWeek, eachDay, format, startOfISOWeek, endOfISOWeek } from 'date-fns';

@Component({
  selector: 'zmz-calendar-week-days',
  templateUrl: './calendar-week-days.component.html',
  styleUrls: [ './calendar-week-days.component.css' ]
})
export class CalendarWeekDaysComponent implements OnInit {
  @Input() clickable: boolean;
  @Input() theme: Theme = 'form';
  @Input() locale: CalendarLocale;
  @Output() weekday: EventEmitter<number> = new EventEmitter<number>();

  weekDays: string[];
  ngOnInit() {
    const today = new Date();
    const weekArray = eachDay(
      this.locale === 'en' ? startOfWeek(today) : startOfISOWeek(today),
      this.locale === 'en' ? endOfWeek(today) : endOfISOWeek(today)
    )
    switch (this.theme){
      case 'show': {
        this.weekDays = weekArray.map(d => format(d, 'dd', { locale: LOCALES[this.locale]}));
        break;
      }
      
      /** Default case is theme === 'form' */
      default:
        this.weekDays = weekArray.map(d => format(d, 'ddd', { locale: LOCALES[this.locale]}));
        break;
    }
  }

  weekDaySelect(day: number) {
    if (this.clickable) {
      this.weekday.emit(day);
    }
  }
}