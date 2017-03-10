import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';

import { State } from '../../types';
import { weeksToShow } from '../../helpers';

@Component({
  selector: 'zmz-calendar-month',
  templateUrl: './calendar-month.component.html',
  styleUrls: [ './calendar-month.component.css' ]
})
export class CalendarMonthComponent implements OnInit {
  @Input() month: number;
  @Input() year: number;
  @Input() stateFn: (date: moment.Moment) => State[];
  @Input() completeMonth: boolean;

  @Output() monthChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() yearChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() dateSelected: EventEmitter<moment.Moment> = new EventEmitter<moment.Moment>();

  weeks: moment.Moment[][] = [];

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

  inMonth(date: moment.Moment) {
    return date.month() === this.month - 1;
  }

  selectDate(date: moment.Moment) {
    if (this.inMonth(date) || (!this.inMonth(date) && this.completeMonth)) {
      this.dateSelected.emit(date);
    }
  }

  dateState(date: moment.Moment) {
    let states = this.stateFn ? this.stateFn(date) : [''];
    if (!this.completeMonth && !this.inMonth(date)) {
      // Remove all states and keep other-month only
      states = ['other-month'];
    }
    return states;
  }

  buildMonth() {
    this.weeks = weeksToShow(this.month, this.year);
  }

  trackDate(index: number, date: moment.Moment) { return date.toISOString(); }
}