import * as moment from 'moment';
import { CalendarState, STATES } from './calendar-state.service';
import { State } from '../types';
import { dateHash } from '../helpers';

describe('state class', () => {
  let date: moment.Moment;
  let state: CalendarState;

  beforeEach(() => {
    date = moment();
    state = new CalendarState([date]);
  });

  it('should create a new calendar-state and populate the map', () => {
    const mapState = state.map[dateHash(date)];
    const defaultState = STATES.NO_STATE;
    expect(mapState).toEqual([defaultState]);
  });

  it('should add the state SELECTED when using set(date, SELECTED)', () => {
    const SELECTED = STATES.SELECTED;
    state.set(date, SELECTED);

    const mapState = state.map[dateHash(date)];
    expect(mapState).toEqual(['', SELECTED]);
  });

  it('should return true to has(date, SELECTED)', () => {
    const SELECTED = STATES.SELECTED;
    state.set(date, SELECTED);
    expect(state.has(date, SELECTED)).toBe(true);
  });

  it('should return a date state when using get(date)', () => {
    const SELECTED = STATES.SELECTED;
    state.set(date, SELECTED);
    expect(state.get(date)).toEqual(['', SELECTED]);
  });

  it('should toggle the state SELECTED when using toggle(date, SELECTED)', () => {
    const SELECTED = STATES.SELECTED;
    state.toggle(date, SELECTED);
    state.toggle(date, SELECTED);
    const mapState = state.map[dateHash(date)];
    expect(mapState).toEqual(['']);
  });

});