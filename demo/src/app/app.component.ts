import { Component } from '@angular/core';
import { CalendarState, State, STATES } from 'zmz-calendar';

import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  date: string;
  state: CalendarState;
  config = {
    theme: 'form',
    locale: 'es',
    weekDayClickable: false,
    completeMonths: true,
    validRange: {
      from: moment().subtract(1, 'day')
    },
    navigationStrategy: 'state'
  };
  private _selectMonth = true;
  month: number;
  year: number;

  constructor() {
    const dates = this.dates();
    this.state = new CalendarState(dates, STATES.AVAILABLE);
    moment.locale('es');
  }

  onDateSelected(date: moment.Moment) {
    const isDisabled = this.state.has(date, STATES.DISABLED);
    if (!isDisabled) {
      const isAvailable = this.state.has(date, STATES.AVAILABLE);
      const isUnAvailable = this.state.has(date, STATES.UNAVAILABLE);

      if (isUnAvailable) {
        this.state.remove(date, STATES.UNAVAILABLE);
        this.state.set(date, STATES.AVAILABLE);
      } else if (isAvailable) {
        this.state.remove(date, STATES.AVAILABLE);
        this.state.set(date, STATES.UNAVAILABLE);
      }
    }
  }

  onWeekDaySelected(day: number) {
    const days = this.getMonth(this.month, this.year).filter((date: moment.Moment) => date.weekday() === day);
    const isUnAvailable = days.findIndex((day) => this.state.has(day, STATES.UNAVAILABLE)) !== -1;

    if (isUnAvailable) {
      this.remove(days, STATES.UNAVAILABLE);
      this.set(days, STATES.AVAILABLE);
    } else {
      this.remove(days, STATES.AVAILABLE);
      this.set(days, STATES.UNAVAILABLE);
    }
  }

  dates() {
    const today = moment();
    const aYear = moment().add(1, 'year');

    const dates = [];

    while(today.isBefore(aYear)) {
      dates.push(today.clone());
      today.add(1, 'day');
    }

    return dates;
  }

  monthChange({month, year}) {
    this.month = month;
    this.year = year;
  }

  get selectMonth() { return this._selectMonth; }
  set selectMonth(value: boolean) {
    this._selectMonth = value;
    const dates = this.getMonth(this.month, this.year);

    if (value) {
      this.remove(dates, STATES.UNAVAILABLE);
      this.set(dates, STATES.AVAILABLE);
    } else {
      this.remove(dates, STATES.AVAILABLE);
      this.set(dates, STATES.UNAVAILABLE);
    }
  }

  set(dates: moment.Moment[], state: State) {

    dates.forEach((date) => {
      if (!this.state.has(date, STATES.DISABLED)) {
        this.state.set(date, state);
      }
    });
  }

  remove(dates: moment.Moment[], state: State) {

    dates.forEach((date) => {
      if (!this.state.has(date, STATES.DISABLED)) {
        this.state.remove(date, state);
      }
    });
  }

  private getMonth(month: number, year: number) {
    const startMonth = moment([year, month - 1]);
    const endMonth = moment([year, month - 1]).endOf('month').startOf('day');

    const result = [];
    while (!startMonth.isAfter(endMonth)) {
      const curr = startMonth.clone();
      result.push(curr);

      startMonth.add(1, 'day');
    }

    return result;
  }
}

