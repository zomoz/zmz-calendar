import * as moment from 'moment';

export type State = 'selected'  // Selected date
                    | 'selectable'
                    | 'not-selectable'
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
  SELECTABLE?: T;
  NOT_SELECTABLE?: T;
}

export interface DateMap {
  [date: string]: State[];
}

export type Locale = 'en' | 'es';

export type NavigationStrategy = 'validRange' | 'state' | boolean;

export type Theme = 'form' | 'show';

export interface CalendarConfig {
  theme?: Theme;
  locale?: Locale;
  weekDayClickable?: boolean;
  completeMonths?: boolean;
  validRange?: {
    from?: moment.Moment,
    to?: moment.Moment
  };
  navigationStrategy?: NavigationStrategy;
  navigationState?: State;
}