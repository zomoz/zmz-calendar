import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { State, CalendarLocale } from '../../types';
import { weeksToShow } from '../../helpers';
import { getMonth, getDate } from 'date-fns';

@Component({
  selector: 'zmz-calendar-month',
  templateUrl: './calendar-month.component.html',
  styleUrls: [ './calendar-month.component.css' ]
})
export class CalendarMonthComponent implements OnInit {
  @Input() month: number;
  @Input() year: number;
  @Input() stateFn: (date: Date) => State[];
  @Input() completeMonth: boolean;
  @Input() locale: CalendarLocale;

  @Output() monthChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() yearChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() dateSelected: EventEmitter<Date> = new EventEmitter<Date>();

  weeks: Date[][] = [];

  ngOnInit() { this.buildMonth(); }

  prev() {
    if (this.month === 1) {
      this.month = 12;
      --this.year;
      this.yearChange.emit(this.year);
    } else  {
      --this.month;
    }

    this.monthChange.emit(this.month);
    this.buildMonth();
  }

  next() {
    if (this.month === 12) {
      this.month = 1;
      ++this.year;
      this.yearChange.emit(this.year);
    } else  {
      ++this.month;
    }

    this.monthChange.emit(this.month);

    this.buildMonth();
  }

  inMonth(date: Date) {
    return getMonth(date) === this.month - 1;
  }

  getDateText(date: Date) {
    return !this.completeMonth && !this.inMonth(date) ? '' : getDate(date);
  }

  selectDate(date: Date) {
    if (this.inMonth(date) || (!this.inMonth(date) && this.completeMonth)) {
      this.dateSelected.emit(date);
    }
  }

  dateState(date: Date) {
    let states = this.stateFn ? this.stateFn(date) : [''];
    if (!this.completeMonth && !this.inMonth(date)) {
      // Remove all states and keep other-month only
      states = ['other-month'];
    }
    return states;
  }

  buildMonth() {
    this.weeks = weeksToShow(this.month, this.year, this.locale);
  }

  trackDate(index: number, date: Date) { return date.getTime(); }
}