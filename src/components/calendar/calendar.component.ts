import { Component, ViewChild, Input, Output, EventEmitter, OnInit } from '@angular/core';

import * as moment from 'moment';

import { CalendarMonthComponent } from '../month/calendar-month.component';
import { CalendarConfig, State } from '../../types';
import { CalendarState } from '../../services';


@Component({
  selector: 'zmz-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: [ './calendar.component.css' ]
})
export class CalendarComponent implements OnInit {
  @Input() config: CalendarConfig;
  @Input() state: CalendarState;
  @Input() month: number;
  @Input() year: number;

  @Output() dateSelected: EventEmitter<moment.Moment> = new EventEmitter<moment.Moment>();
  @Output() weekDaySelected: EventEmitter<number> = new EventEmitter<number>();
  @Output() monthChange: EventEmitter<{year: number, month: number}> = new EventEmitter<{year: number, month: number}>();
  @ViewChild(CalendarMonthComponent) monthCmp: CalendarMonthComponent;

  stateFn: (d: moment.Moment) => State[];
  weekDayClickable: boolean;
  completeMonth: boolean;

  constructor() {}

  ngOnInit() {
    const defaultLocale = 'es';
    const { locale, weekDayClickable, completeMonths } = this.config; 

    // Set locale
    moment.locale(locale ? locale : defaultLocale);

    // weekdays clickable defaults to false
    this.weekDayClickable = weekDayClickable || false;
    // Complete month defaults to false too
    this.completeMonth = completeMonths || false;

    // Month and year defaults to currents
    const today = moment();
    if (!this.month) { this.month = today.month() + 1; }
    if (!this.year) { this.year = today.year(); }

    // First emission when calendar is initialized
    this.monthChange.emit({ year: this.year, month: this.month });


    if (this.state) {
      this.stateFn = (date: moment.Moment) => {
        return this.state.get(date);
      }
    }
  }

  onNext() {
    this.monthCmp.next();
    this.monthChange.emit({ year: this.year, month: this.month });
  }

  onPrev() {
    this.monthCmp.prev();
    this.monthChange.emit({ year: this.year, month: this.month });
  }

  onDateSelected(date: moment.Moment) {
    this.dateSelected.emit(date);
  }

  onWeekDaySelected(day: number) {
    this.weekDaySelected.emit(day);
  }

  get monthName() {
    const monthName = moment.months()[this.month - 1];
    return `${monthName.charAt(0).toUpperCase()}${monthName.slice(1)}`;
  }
}