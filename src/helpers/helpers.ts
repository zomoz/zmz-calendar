import * as moment from 'moment';
import { range } from 'lodash';

import { State } from '../types';

const firstDayOfWeek = 0;
const lastDayOfWeek = 6;

/**
 * Returns the first day to show in a month depending on the first day of the week
 * @param month (1 - indexed)
 * @param year 
 * @return date as Moment
 */
export function firstDateToShow(month: number, year: number) : moment.Moment {
    const startMonth = moment([year, month - 1]);

    if (startMonth.weekday() > firstDayOfWeek) {
      const diff = startMonth.weekday() - firstDayOfWeek;
      return startMonth.subtract(diff, 'days')
    } else {
      return startMonth;
    }
}

/**
 * Returns the last day to show in a month depending on the last day of the week
 * @param month (1 - indexed)
 * @param year
 * @return date as Moment
 */
export function lastDateToShow(month: number, year: number): moment.Moment {
    const endMonth = moment([year, month - 1]).endOf('month').startOf('day');
    if (endMonth.weekday() < lastDayOfWeek) {

      const diff = lastDayOfWeek - endMonth.weekday();
      return endMonth.add(diff, 'days')
    } else {
      return endMonth;
    }
}

/**
 * Returns an array of weeks (or a matrix of dates) representing the month to show
 * @param month (1 - indexed)
 * @param year
 * @return weeks as Moment[][]
 */
export function weeksToShow(month: number, year: number): moment.Moment[][] {
  const start = firstDateToShow(month, year);
  const end = lastDateToShow(month, year);
  const weekDays = range(firstDayOfWeek, lastDayOfWeek + 1);

  let weeks = [];
  while(start.isBefore(end)) {
    let week = weekDays.map((day: number) => {
      const currDate = start.clone();
      start.add(1, 'day');
      return currDate;
    });

    weeks.push(week);
  }

  return weeks;
}

export function dateHash(date: Date) {
  return format(date, 'YYYY-MM-DD');
}