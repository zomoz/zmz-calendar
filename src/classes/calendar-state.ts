import { isArray, keys, sortBy } from 'lodash';

import { dateHash } from '../helpers';
import { DateMap, State, StateMap } from '../types';
import { startOfDay, parse } from 'date-fns';

// TODO add tests extending states
export const STATES: StateMap<State> = {
  NO_STATE: '',
  DISABLED: 'disabled',
  UNAVAILABLE: 'unavailable',
  AVAILABLE: 'available',
  SELECTED: 'selected',
  SELECTABLE: 'selectable',
  NOT_SELECTABLE: 'not-selectable'
};

export class CalendarState {
  map: DateMap;

  constructor(dates: Date[], defaultState: State = STATES.NO_STATE) {
    /** Populate map with stateless dates */
    this.map = {};
    dates.forEach(date => {
      const hash = dateHash(startOfDay(date));
      this.map[hash] = [defaultState];
    });
  }

  set(date: Date, state: State) {
    const hash = dateHash(date);
    if (isArray(this.map[hash]) && this.map[hash].findIndex((st) => st === state) === -1) {
      this.map[hash].push(state);
    } else if (!isArray(this.map[hash])) {
      this.map[hash] = [state];
    }
  }

  toggle(date: Date, state: State) {
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

  has(date: Date, state: State): boolean {
    const hash = dateHash(date);
    return isArray(this.map[hash]) ? this.map[hash].findIndex((st) => st === state) !== -1 : false;
  }

  get(date: Date): State[] {
    const hash = dateHash(date);
    return this.map[hash] || [];
  }

  remove(date: Date, state: State) {
    const hash = dateHash(date);
    let states = this.map[hash];
    if (isArray(states)) {
      const index = states.findIndex((st) => st === state);
      if (index !== -1) { states.splice(index, 1); }
    }
  }

  getAll(state: State): Date[] {
    const all = keys(this.map).filter((hash) =>
      isArray(this.map[hash]) ? this.map[hash].findIndex((st) => st === state) !== -1 : false
    );

    return all.map((hash) => parse(hash));
  }

  getLast(state: State): Date {
    const all = sortBy(this.getAll(state));
    return all[all.length - 1];
  }

  getFirst(state: State): Date {
    const all = sortBy(this.getAll(state));
    return all[0];
  }
}
