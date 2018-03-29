import { range } from 'lodash';

import {
  format,
  endOfMonth, startOfDay,
  getDay,
  addDays, subDays,
  isBefore,
  startOfMonth
} from 'date-fns';

import { State } from '../types';

const firstDayOfWeek = 0;
const lastDayOfWeek = 6;

/**
 * Returns the first day to show in a month depending on the first day of the week
 * @param month (1 - indexed)
 * @param year 
 * @return date as Date
 */
export function firstDateToShow(month: number, year: number) : Date {
  const startMonth = startOfDay(startOfMonth(new Date(year, month - 1)));
  const dayOfWeek = getDay(startMonth);

    if (dayOfWeek > firstDayOfWeek) {
      const diff = dayOfWeek - firstDayOfWeek;
      return subDays(startMonth, diff);
    } else {
      return startMonth;
    }
}

/**
 * Returns the last day to show in a month depending on the last day of the week
 * @param month (1 - indexed)
 * @param year
 * @return date as Date
 */
export function lastDateToShow(month: number, year: number): Date {
  const endMonth = startOfDay(endOfMonth(new Date(year, month - 1)));
  const dayOfWeek = getDay(endMonth);
  if (dayOfWeek < lastDayOfWeek) {

    const diff = lastDayOfWeek - dayOfWeek;
    return addDays(endMonth, diff);
  } else {
    return endMonth;
  }
}

/**
 * Returns an array of weeks (or a matrix of dates) representing the month to show
 * @param month (1 - indexed)
 * @param year
 * @return weeks as Date[][]
 */
export function weeksToShow(month: number, year: number): Date[][] {
  let start = firstDateToShow(month, year);
  const end = lastDateToShow(month, year);
  const weekDays = range(firstDayOfWeek, lastDayOfWeek + 1);

  let weeks = [];
  while(isBefore(start, end)) {
    let week = weekDays.map((day: number) => {
      const currDate = new Date(start.getTime());
      start = addDays(start, 1);
      return currDate;
    });

    weeks.push(week);
  }

  return weeks;
}

export function dateHash(date: Date) {
  return format(date, 'YYYY-MM-DD');
}