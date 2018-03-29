import { firstDateToShow, lastDateToShow, weeksToShow } from './helpers';
import { format } from 'date-fns';

describe('helpers', () => {

  it('should return Jan 29 2017 when getting first day to show in february 2017 on locale en', () => {
    const month = 2;
    const year = 2017;
    const expectedDate = new Date(2017, 0, 29);

    expect(firstDateToShow(month, year, 'en')).toEqual(expectedDate);
  });

  it('should return March 4 2017 when getting last day to show in february 2017 on locale en', () => {
    const month = 2;
    const year = 2017;
    const expectedDate = new Date(2017, 2, 4);
    expectedDate.setHours(0, 0, 0, 0);

    expect(lastDateToShow(month, year, 'en')).toEqual(expectedDate);
  });

  it('should return Jan 30 2017 when getting first day to show in february 2017 on locale es', () => {
    const month = 2;
    const year = 2017;
    const expectedDate = new Date(2017, 0, 30);

    expect(firstDateToShow(month, year, 'es')).toEqual(expectedDate);
  });

  it('should return March 5 2017 when getting last day to show in february 2017 on locale es', () => {
    const month = 2;
    const year = 2017;
    const expectedDate = new Date(2017, 2, 5);
    expectedDate.setHours(0, 0, 0, 0);

    expect(lastDateToShow(month, year, 'es')).toEqual(expectedDate);
  });

  it('should return the month February 2017 starting on Sunday when locale is en', () => {
    const expectedStart = '2017-01-29';
    const expectedEnd = '2017-03-04';
    const expectedDays = 7;
    const expectedWeeks = 5;

    const month = 2;
    const year = 2017;

    const weeks = weeksToShow(month, year, 'en');

    expect(weeks.length).toBe(expectedWeeks);
    expect(weeks[0].length).toBe(expectedDays);

    expect(format(weeks[0][0], 'YYYY-MM-DD')).toEqual(expectedStart);
    expect(format(weeks[expectedWeeks - 1][expectedDays - 1], 'YYYY-MM-DD')).toEqual(expectedEnd);

  });

  it('should return the month February 2017 starting on Monday when locale is es', () => {
    const expectedStart = '2017-01-30';
    const expectedEnd = '2017-03-05';
    const expectedDays = 7;
    const expectedWeeks = 5;

    const month = 2;
    const year = 2017;

    const weeks = weeksToShow(month, year, 'es');

    expect(weeks.length).toBe(expectedWeeks);
    expect(weeks[0].length).toBe(expectedDays);

    expect(format(weeks[0][0], 'YYYY-MM-DD')).toEqual(expectedStart);
    expect(format(weeks[expectedWeeks - 1][expectedDays - 1], 'YYYY-MM-DD')).toEqual(expectedEnd);

  });
})
