import { Component, ViewChild, Input, Output, EventEmitter, OnInit, OnChanges, ChangeDetectionStrategy } from '@angular/core';

import { CalendarMonthComponent } from '../month/calendar-month.component';
import { CalendarConfig, State, NavigationStrategy, Theme, CalendarLocale } from '../../types';
import { CalendarState, STATES } from '../../classes';
import { firstDateToShow, lastDateToShow } from '../../helpers';
import { isAfter, isBefore, format, getMonth, getYear } from 'date-fns';
import { LOCALES } from '../../locales';


@Component({
  selector: 'zmz-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: [ './calendar.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent implements OnInit, OnChanges {
  @Input() config: CalendarConfig;
  @Input() state: CalendarState;
  @Input() month: number;
  @Input() year: number;

  @Output() dateSelected: EventEmitter<Date> = new EventEmitter<Date>();
  @Output() weekDaySelected: EventEmitter<number> = new EventEmitter<number>();
  @Output() monthChange: EventEmitter<{year: number, month: number}> = new EventEmitter<{year: number, month: number}>();
  @ViewChild(CalendarMonthComponent) monthCmp: CalendarMonthComponent;

  stateFn: (d: Date) => State[];
  weekDayClickable: boolean;
  completeMonth: boolean;

  navigationStrategy: NavigationStrategy;
  navigationState: State;

  validRange: { from?: Date, to?: Date };

  theme: Theme;
  locale: CalendarLocale;

  ngOnInit() {
    const {
      theme = 'form',
      locale = 'es',
      // weekdays, complete month and nav strategy clickable defaults to false
      weekDayClickable = false,
      completeMonths = false,
      navigationStrategy = false,
      navigationState = STATES.AVAILABLE,
      validRange = {}
    } = this.config || {} as CalendarConfig;

    // Set locale
    this.locale = locale;

    this.theme = theme;

    this.weekDayClickable = weekDayClickable;
    this.completeMonth = completeMonths;

    this.navigationStrategy = navigationStrategy as NavigationStrategy;
    this.navigationState = navigationState;

    this.validRange = validRange;

    // Month and year defaults to currents
    const today = new Date();
    if (!this.month) { this.month = getMonth(today) + 1; }
    if (!this.year) { this.year = getYear(today); }

    // First emission when calendar is initialized
    this.monthChange.emit({ year: this.year, month: this.month });

    if (this.state) {
      this.stateFn = (date: Date) => {
        if (this.validRange && this.validRange.from && isAfter(this.validRange.from, date)) {
          return [STATES.DISABLED];
        } else if (this.validRange && this.validRange.to && isBefore(this.validRange.to, date)) {
          return [STATES.DISABLED];
        } else {
          return this.state.get(date);
        }
      }
    }
  }

  ngOnChanges() {
    if (this.navigationStrategy === 'state') {
      this.validRange = {
        from: this.state.getFirst(this.navigationState),
        to: this.state.getLast(this.navigationState)
      }
    }
  }

  canGoNext() {
    if (!this.navigationStrategy) { return true; }

    switch (this.navigationStrategy) {
      case 'validRange':
      case 'state':
        return this.validRange && this.validRange.to
          ? isBefore(lastDateToShow(this.month, this.year, this.locale), this.validRange.to)
          : true;

      default:
        return true;
    }
  }

  canGoPrev() {
    if (!this.navigationStrategy) { return true; }

    switch (this.navigationStrategy) {
      case 'validRange':
      case 'state':
        return this.validRange && this.validRange.from
          ? isAfter(firstDateToShow(this.month, this.year, this.locale), this.validRange.from)
          : true;

      default:
        return true;
    }
  }

  onNext() {
    if (this.canGoNext()) {
      this.monthCmp.next();
      this.monthChange.emit({ year: this.year, month: this.month });
    }
  }

  onPrev() {
    if (this.canGoPrev()) {
      this.monthCmp.prev();
      this.monthChange.emit({ year: this.year, month: this.month });
    }
  }

  onDateSelected(date: Date) {
    this.dateSelected.emit(date);
  }

  onWeekDaySelected(day: number) {
    this.weekDaySelected.emit(day);
  }

  get monthName() {
    const date = new Date();
    date.setMonth(this.month - 1);
    return format(date, 'MMMM', { locale: LOCALES[this.locale]});
  }
}
