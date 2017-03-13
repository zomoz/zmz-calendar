import * as moment from 'moment';

export type State = 'selected'  // Selected date
                    | 'available'  // Available date
                    | 'unavailable' // Unavailable date (visibly unavailable but might accept actions on it)
                    | 'disabled' // Disabled date (can't perform any action on it)
                    | ''; // No state

export interface StateMap<T> {
  NO_STATE: T;
  DISABLED: T;
  UNAVAILABLE: T;
  AVAILABLE: T;
  SELECTED: T;
}

export interface DateMap {
  [date: string]: State[];
}

export type Locale = 'en' | 'es';

export interface CalendarConfig {
  locale?: Locale;
  weekDayClickable?: boolean;
  completeMonths?: boolean;
  validRange?: {
    from?: moment.Moment,
    to?: moment.Moment
  }
}