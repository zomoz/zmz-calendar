# zmz-calendar
[![Build Status](https://travis-ci.org/zoitravel/zmz-calendar.svg?branch=master)](https://travis-ci.org/zoitravel/zmz-calendar)

angular responsive calendar/datepicker

# Getting Started

## Prerequisites

For packages version, please refer to package.json

## Installing

Simply install from npm

```
npm install --save zmz-calendar
```

and add ZomoZ font to your project: Copy the fonts from  `src/assets/fonts/icons/zomoz-font.*` to your project assets and create the font face

```
@font-face {
  font-family: 'ZomoZ';
  src: url('/path/to/font/zomoz-font.eot');
  src: url('/path/to/font/zomoz-font.eot?#iefix') format('embedded-opentype'),
  url('/path/to/font/zomoz-font.woff') format('woff'),
  url('/path/to/font/zomoz-font.ttf') format('truetype'),
  url('/path/to/font/zomoz-font.svg#ZomoZ') format('svg');

  font-weight: normal;
  font-style: normal;
}
```

If you don't include this font, some icons won't display right and the name **must** be the same.

## Usage

The library is componsed by two elemnts: The calendar component and the calendar state to control it. The component uses the state but it doesn't modify it

### Component `zmz-calendar`

This component holds all the calendar logic. It's intend to be a dumb component who just emits click events.

#### Inputs

1. config: Calendar's general configuration. It's a javascript object containing the following:
    1. locale (_optional_): The calendar locale to use. It uses [date-fns](https://date-fns.org/v1.29.0/docs/I18n#supported-languages) locales but only supports `en` and `es`. Defaults to `es`
    2. weekDayClickable (_optional_): True if the week days are clickable and emit the day number on click. Defaults to `false`
    3. completeMonths (_optional_): True if we want the calendar to show days of othe months in the current month. Defaults to `false`
    4. validRange (_optional_): Object containing `from` and `to` setting all dates outside the range as disabled. Is any boundary is missing, 
    then it's taken as infinite. 
    5. navigationStrategy (_optional_): The strategy to enable/disable calendar navigation
        1. false or undefined: Navigation always enabled 
        2. _validRange_: Based on validRange configuration. It disables navigation if next/prev month is outside validRange
        3. _state_: Based on the calendar state. It looks for the first and last date with `navigationState` state and disables 
        the navigation for the dates outside that range. If `navigationState` is not provided, it defaults to `available`
    6. navigationState (_optional_): State used in the _state_ navigation strategy.
    7. theme (_optional_): Set calendar styles. Possible values `form` or `show`.
2. state: CalendarState indicating how the dates are displayed. More details below
3. month: The number of the month to be initialy displayed. It's 1-based
4. year: The number of the year to be initialy displayed.

#### Outputs

  1. dateSelected: Emits whenever a date is clicked (and is enabled)
  2. weekDaySelected: Emits whenever a weekday is clicked and weekDayClickable is true
  3. monthChange: Emits with current month and year whenever the month is changed. It also emits OnInit

### Service `CalendarState`

This is the state the library user should modify to change the calendar. It tags a set of dates with different states so 
they're displayed according to them

#### States

1. NO_STATE: none, not clickable
2. DISABLED: not clickable with disabled styles
3. UNAVAILABLE: clickable with unavailable styles
4. AVAILABLE: clickable with available styles
5. SELECTED: clickable with selected styles
6. SELECTABLE: clickable with selectable styles
7. NOT_SELECTABLE: clickable with not-selectable styles

You can use them importing `STATES` from the library: `import { STATES } from 'zmz-calendar'`.

#### CalendarState API

1. constructor(dates: Date[], defaultState: State = STATES.NO_STATE): Receives an array of dates with a initial state which defaults to none
2. set(date: Date, state: State): Sets a state to a date
3. toggle(date: Date, state: State): Toggles a state in a date (if it was present it's removed)
4. has(date: Date, state: State): True if the date has the specified state
5. get(date: Date): Gets an array of states from a date
6. remove(date: Date, state: State): Removes the state from date. If it doesn't exist, it's noop
7. getAll(state: State): Returns an array of Date from those dates matching the state state
8. getFirst(state: State): Returns the first date matching the state state as a Date
9. getLast(state: State): Returns the last date matching the state state as a Date

You should instantiate a `CalendarState` and use its api to modify it


### Example of usage

`app.component.ts`
```ts
import { Component } from '@angular/core';
import { CalendarState, State, STATES } from 'zmz-calendar';

import { format, addDays, addYears, isBefore } from 'date-fns';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  date: string;
  state: CalendarState;
  config = { locale: 'es', weekDayClickable: false };

  constructor() {
    const dates = this.dates();
    this.state = new CalendarState(dates, STATES.AVAILABLE);
  }

  onDateSelected(date: Date) {
    const isDisabled = this.state.has(date, STATES.DISABLED);
    if (!isDisabled) {
      const av = this.state.toggle(date, STATES.UNAVAILABLE);
      if (av) {
        this.date = format(date);
      }
    }
  }

  dates() {
    const today = new Date();
    toda.setHours(0, 0, 0, 0);

    const aYear = addYears(today, 1);

    let dates = [];

    while(isBefore(today, aYear)) {

      dates.push(new Date(today.getTime());
      today = addDays(today, 1);
    }

    return dates;
  }
}

```

`app.component.html`
```html
<div style="max-width: 500px; width: 100%">
  <zmz-calendar [state]="state" [config]="config" (dateSelected)="onDateSelected($event)">
    <div class="prev btn">
      <i class="fa fa-arrow-left" aria-hidden="true"></i>
    </div>
    <div class="next btn">
      <i class="fa fa-arrow-right" aria-hidden="true"></i>
    </div>
  </zmz-calendar>
</div>
{{ date }}
```

## Developers

### Running tests

Using npm
```
npm test
```

### Development

1. To develop the calendar business logic, we recommend using `TDD`
2. To develop styles, you have to follow these steps:
    1. Run `gulp watch` to build the project and start watching file changes
    2. (In another terminal) run `npm link` in the root of the project
    3. Go to the `demo` project and run `npm link zmz-calendar` and `npm install`
    4. Go to the `demo` project and run `npm start`
