import * as moment from 'moment';

import { firstDateToShow, lastDateToShow, weeksToShow } from './helpers';

describe('helpers', () => {
  let locale;
  beforeAll(() => {
    locale = moment.locale();
    moment.locale('en')
  });

  afterAll(() => moment.locale(locale));

  it('should return Jan 29 2017 when getting first day to show in february 2017', () => {
    const month = 2;
    const year = 2017;
    const expectedDate = moment([2017, 0, 29]).format('YYYY-MM-DD');

    expect(firstDateToShow(month, year).format('YYYY-MM-DD')).toEqual(expectedDate);
  });

  it('should return Jan 29 2017 when getting first day to show in february 2017', () => {
    const month = 2;
    const year = 2017;
    const expectedDate = new Date(2017, 2, 4);
    expectedDate.setHours(0, 0, 0, 0);

    expect(lastDateToShow(month, year)).toEqual(expectedDate);
  });

  it('should return the month February 2017', () => {
    const expectedStart = moment([2017, 0, 29]).format('YYYY-MM-DD');
    const expectedEnd = moment([2017, 2, 4]).format('YYYY-MM-DD');
    const expectedDays = 7;
    const expectedWeeks = 5;

    const month = 2;
    const year = 2017;

    const weeks = weeksToShow(month, year);

    expect(weeks.length).toBe(expectedWeeks);
    expect(weeks[0].length).toBe(expectedDays);

    expect(weeks[0][0].format('YYYY-MM-DD')).toEqual(expectedStart);
    expect(weeks[expectedWeeks - 1][expectedDays - 1].format('YYYY-MM-DD')).toEqual(expectedEnd);

  });
})
