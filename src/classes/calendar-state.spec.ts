import * as moment from 'moment';
import { CalendarState, STATES } from './calendar-state';
import { State } from '../types';
import { dateHash } from '../helpers';
import { addDays, subDays } from 'date-fns';

describe('state class', () => {
  let date: Date;
  let state: CalendarState;

  beforeEach(() => {
    date = new Date('2018-03-03');
    date.setHours(0, 0, 0, 0);
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

  it('should remove the state SELECTED when using remove(date, SELECTED)', () => {
    const SELECTED = STATES.SELECTED;
    state.set(date, SELECTED);
    state.remove(date, SELECTED);
    const mapState = state.map[dateHash(date)];
    expect(mapState).toEqual(['']);
  });

  it('should get all dates with state SELECTED', () => {
    const SELECTED = STATES.SELECTED;
    const AVAILABLE = STATES.AVAILABLE;
    const date1 = addDays(date, 1);
    const date2 = addDays(date, 2);

    state.set(date, SELECTED);
    state.set(date1, SELECTED);
    state.set(date2, AVAILABLE);

    const result = state.getAll(SELECTED);
    expect(result.length).toBe(2);
    expect(result[0]).toEqual(date);
    expect(result[1]).toEqual(date1);
  });

  it('should get empty array of dates with state SELECTED', () => {
    const AVAILABLE = STATES.AVAILABLE;
    const date1 = addDays(date, 1);
    const date2 = addDays(date, 2);

    state.set(date, AVAILABLE);
    state.set(date1, AVAILABLE);
    state.set(date2, AVAILABLE);

    const SELECTED = STATES.SELECTED;
    const result = state.getAll(SELECTED);
    expect(result.length).toBe(0);
  });

  it('should get first date with state AVAILABLE', () => {

    const AVAILABLE = STATES.AVAILABLE;
    const date1 = subDays(date, 1);
    const date2 = addDays(date, 2);

    state.set(date, AVAILABLE);
    state.set(date1, AVAILABLE);
    state.set(date2, AVAILABLE);

    const result = state.getFirst(AVAILABLE);
    expect(result).toEqual(date1);
  });

  it('should get last date with state AVAILABLE', () => {

    const AVAILABLE = STATES.AVAILABLE;
    const date1 = subDays(date, 1);
    const date2 = addDays(date, 2);

    state.set(date, AVAILABLE);
    state.set(date1, AVAILABLE);
    state.set(date2, AVAILABLE);

    const result = state.getLast(AVAILABLE);
    expect(result).toEqual(date2);
  });

});
