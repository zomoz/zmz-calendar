import { Injectable } from '@angular/core';
import * as moment from 'moment';

import { isArray, keys } from 'lodash';

import { dateHash } from '../helpers';
import { DateMap, State, StateMap } from '../types';

export const STATES: StateMap<State> = {
  NO_STATE: '',
  DISABLED: 'disabled',
  UNAVAILABLE: 'unavailable',
  AVAILABLE: 'available',
  SELECTED: 'selected'
};

@Injectable()
export class CalendarState {
  map: DateMap;

  constructor(dates: moment.Moment[], defaultState: State = STATES.NO_STATE) {
    /** Populate map with stateless dates */
    this.map = {};
    dates.forEach((date: moment.Moment) => {
      const hash = dateHash(date);
      this.map[hash] = [defaultState];
    });
  }

  set(date: moment.Moment, state: State) {
    const hash = dateHash(date);
    if (isArray(this.map[hash]) && this.map[hash].findIndex((st) => st === state) === -1) {
      this.map[hash].push(state);
    } else if (!isArray(this.map[hash])) {
      this.map[hash] = [state];
    }
  }

  toggle(date: moment.Moment, state: State) {
    const hash = dateHash(date);
    let states = this.map[hash];

    if (isArray(states)) {
      const index = states.findIndex((st) => st === state);
      if (index === -1) {
        states.push(state);
      } else {
        states.splice(index, 1);
      }
    } else {
      states = [state];
    }

  }

  has(date: moment.Moment, state: State): boolean {
    const hash = dateHash(date);
    return isArray(this.map[hash]) ? this.map[hash].findIndex((st) => st === state) !== -1 : false;
  }

  get(date: moment.Moment): State[] {
    const hash = dateHash(date);
    return this.map[hash] || [];
  }

  remove(date: moment.Moment, state: State) {
    const hash = dateHash(date);
    let states = this.map[hash];
    if (isArray(states)) {
      const index = states.findIndex((st) => st === state);
      if (index !== -1) { states.splice(index, 1); }
    }
  }

  getAll(state: State): moment.Moment[] {
    const all = keys(this.map).filter((hash) =>
      isArray(this.map[hash]) ? this.map[hash].findIndex((st) => st === state) !== -1 : false
    );

    return all.map((hash) => moment(hash));
  }
}
