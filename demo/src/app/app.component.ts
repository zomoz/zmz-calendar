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
  config = { locale: 'es', weekDayClickable: false };

  constructor() {
    const dates = this.dates();
    this.state = new CalendarState(dates, STATES.AVAILABLE);
  }

  onDateSelected(date: moment.Moment) {
    const isDisabled = this.state.has(date, STATES.DISABLED);
    if (!isDisabled) {
      const av = this.state.toggle(date, STATES.UNAVAILABLE);
      if (av) {
        this.date = date.format();
      }
    }
  }

  dates() {
    const today = moment();
    const aYear = moment().add(1, 'year');

    let dates = [];

    while(today.isBefore(aYear)) {
      dates.push(today.clone());
      today.add(1, 'day');
    }

    return dates;
  }
}
