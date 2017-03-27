import { Component, ViewChild, Input, Output, EventEmitter, OnInit } from '@angular/core';

import * as moment from 'moment';

import { CalendarMonthComponent } from '../month/calendar-month.component';
import { CalendarConfig, State, NavigationStrategy, Theme } from '../../types';
import { CalendarState, STATES } from '../../classes';
import { firstDateToShow, lastDateToShow } from '../../helpers';


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

  navigationStrategy: string | NavigationStrategy;
  navigationState: State;

  validRange: { from?: moment.Moment, to?: moment.Moment };

  theme: Theme;

  ngOnInit() {
    const {
      theme = 'form',
      locale = 'es',
      // weekdays, complete month and nav strategy clickable defaults to false
      weekDayClickable = false,
      completeMonths = false,
      navigationStrategy = false,
      navigationState = STATES.AVAILABLE,
      validRange = {}
    } = this.config || {} as CalendarConfig; 

    // Set locale
    moment.locale(locale);

    this.theme = theme;

    this.weekDayClickable = weekDayClickable;
    this.completeMonth = completeMonths;

    this.navigationStrategy = navigationStrategy as NavigationStrategy;
    this.navigationState = navigationState;

    this.validRange = validRange;

    // Month and year defaults to currents
    const today = moment();
    if (!this.month) { this.month = today.month() + 1; }
    if (!this.year) { this.year = today.year(); }

    // First emission when calendar is initialized
    this.monthChange.emit({ year: this.year, month: this.month });

    if (this.state) {
      this.stateFn = (date: moment.Moment) => {
        if (this.validRange && this.validRange.from && this.validRange.from.isAfter(date)) {
          return [STATES.DISABLED];
        } else if (this.validRange && this.validRange.to && this.validRange.to.isBefore(date)) {
          return [STATES.DISABLED];
        } else {
          return this.state.get(date);
        }
      }
    }
  }

  canGoNext() {
    if (!this.navigationStrategy) { return true; }

    switch (this.navigationStrategy ) {
      case 'validRange':
        return this.validRange && this.validRange.to ? 
               lastDateToShow(this.month, this.year).isBefore(this.validRange.to) : true; 

      case 'state':
        return lastDateToShow(this.month, this.year).isBefore(this.state.getLast(this.navigationState));

      default: return true;
    }
  }

  canGoPrev() {
    if (!this.navigationStrategy) { return true; }

    switch (this.navigationStrategy ) {
      case 'validRange':
        return this.validRange && this.validRange.from ? 
               firstDateToShow(this.month, this.year).isAfter(this.validRange.from) : true; 

      case 'state':
        return firstDateToShow(this.month, this.year).isAfter(this.state.getFirst(this.navigationState));

      default: return true;
    }
  }

  onNext() {
    if (this.canGoNext()) {
      this.monthCmp.next();
      this.monthChange.emit({ year: this.year, month: this.month });
    }
  }

  onPrev() {
    if (this.canGoPrev()) {
      this.monthCmp.prev();
      this.monthChange.emit({ year: this.year, month: this.month });
    }
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