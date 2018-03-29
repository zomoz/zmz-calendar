export type State = 'selected'  // Selected date
                    | 'available'  // Available date
                    | 'unavailable' // Unavailable date (visibly unavailable but might accept actions on it)
                    | 'disabled' // Disabled date (can't perform any action on it)
                    | 'selectable' // Makes the date selectable
                    | 'not-selectable' // Makes the date not selectable
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

export type CalendarLocale = 'es' | 'en';

export type NavigationStrategy = 'validRange' | 'state' | boolean;

export type Theme = 'form' | 'show';

export interface CalendarConfig {
  theme?: Theme;
  locale?: CalendarLocale;
  weekDayClickable?: boolean;
  completeMonths?: boolean;
  validRange?: {
    from?: Date,
    to?: Date
  };
  navigationStrategy?: NavigationStrategy;
  navigationState?: State;
}
