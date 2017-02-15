import * as moment from 'moment';

import { firstDateToShow, lastDateToShow, weeksToShow } from './helpers';

describe('helpers', () => {

  it('should return Jan 29 2017 when getting first day to show in february 2017', () => {
    const month = 2;
    const year = 2017;
    const expectedDate = moment([2017, 0, 29]).toISOString();

    expect(firstDateToShow(month, year).toISOString()).toEqual(expectedDate);
  });

  it('should return Jan 29 2017 when getting first day to show in february 2017', () => {
    const month = 2;
    const year = 2017;
    const expectedDate = moment([2017, 2, 4]).toISOString();

    expect(lastDateToShow(month, year).toISOString()).toEqual(expectedDate);
  });

  it('should return the month February 2017', () => {
    const expectedStart = moment([2017, 0, 29]).toISOString();
    const expectedEnd = moment([2017, 2, 4]).toISOString();
    const expectedDays = 7;
    const expectedWeeks = 5;

    const month = 2;
    const year = 2017;

    const weeks = weeksToShow(month, year);

    expect(weeks.length).toBe(expectedWeeks);
    expect(weeks[0].length).toBe(expectedDays);

    expect(weeks[0][0].toISOString()).toEqual(expectedStart);
    expect(weeks[expectedWeeks - 1][expectedDays - 1].toISOString()).toEqual(expectedEnd);

  });
})