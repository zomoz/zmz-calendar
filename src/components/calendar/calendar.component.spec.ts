import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import * as moment from 'moment';

import { STATES, CalendarState } from '../../classes';
import { CalendarDayComponent } from '../day';
import { CalendarMonthComponent } from '../month';
import { CalendarWeekDaysComponent } from '../week-days';
import { CalendarComponent } from './calendar.component';

function detectChanges(fixture: ComponentFixture<CalendarComponent>) {
  // HACK: ngOnChanges is run only when the data-binding is updated by Angular and not direct manipulation.
  // Read more at https://github.com/angular/angular/issues/9866#issuecomment-261631059
  fixture.componentInstance.ngOnChanges();
  fixture.detectChanges();
}

describe('calendar component', () => {
  let comp: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  let state: CalendarState;
  const date = moment();
  let validRange: any = {};
  let navigationStrategy: any = false;
  let config = { validRange, navigationStrategy };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        CalendarDayComponent,
        CalendarMonthComponent,
        CalendarWeekDaysComponent,
        CalendarComponent
      ]
    });

    fixture = TestBed.createComponent(CalendarComponent);

    state = new CalendarState([date], STATES.AVAILABLE);
    comp = fixture.componentInstance;

    comp.state = state;
    comp.config = config;
    fixture.detectChanges();
  });


  describe('state function', () => {
    it('set the stateFn as state.get(date)', () => {
      expect(comp.stateFn(date)).toEqual([STATES.AVAILABLE]);
    });

    it('set the stateFn using validRange from and to', () => {
      validRange.from = moment().add(1, 'day');
      validRange.to = moment().add(2, 'day');
      const myDate = moment();
      expect(comp.stateFn(myDate)).toEqual([STATES.DISABLED]);
    });

    it('set the stateFn using validRange from without to', () => {
      validRange.from = moment().add(1, 'day');
      delete validRange.to;
      const myDate1 = moment();
      const myDate2 = moment().add(1, 'year');
      state.set(myDate2, STATES.AVAILABLE);

      expect(comp.stateFn(myDate1)).toEqual([STATES.DISABLED]);
      expect(comp.stateFn(myDate2)).toEqual([STATES.AVAILABLE]);
    });

    it('set the stateFn using validRange to without from', () => {
      delete validRange.from;
      validRange.to = moment().add(2, 'day');

      const myDate1 = moment();
      const myDate2 = moment().add(3, 'day');
      state.set(myDate1, STATES.AVAILABLE);

      expect(comp.stateFn(myDate1)).toEqual([STATES.AVAILABLE]);
      expect(comp.stateFn(myDate2)).toEqual([STATES.DISABLED]);
    });
  });

  describe('navigation strategy', () => {
    it('should can go next and prev if there is no navigation strategy', () => {
      expect(comp.canGoNext()).toBe(true);
      expect(comp.canGoPrev()).toBe(true);
    });

    it('should not can go next if next month is outside validRange when strategy is validRange', () => {
      comp.navigationStrategy = 'validRange';
      detectChanges(fixture);

      validRange.from = moment();
      validRange.to = moment().add(2, 'days');
      expect(comp.canGoNext()).toBe(false);
    });

    it('should not can go prev if prev month is outside validRange when strategy is validRange', () => {
      comp.navigationStrategy = 'validRange';
      detectChanges(fixture);

      validRange.from = moment();
      validRange.to = moment().add(2, 'days');
      expect(comp.canGoPrev()).toBe(false);
    });

    it('should can go next/prev if validRange is not specified when strategy is validRange', () => {
      comp.navigationStrategy = 'validRange';
      detectChanges(fixture);

      delete validRange.from;
      delete validRange.to;
      expect(comp.canGoNext()).toBe(true);
      expect(comp.canGoPrev()).toBe(true);
    });

    it('should not can go next/prev if only date available is in current month when strategy is validRange', () => {
      comp.navigationStrategy = 'validRange';
      detectChanges(fixture);

      validRange.from = moment();
      validRange.to = moment();
      expect(comp.canGoNext()).toBe(false);
      expect(comp.canGoPrev()).toBe(false);
    });

    it('should not can go next/prev if only date available is in current month when strategy is state', () => {
      comp.navigationStrategy = 'state';
      detectChanges(fixture);
      expect(comp.canGoNext()).toBe(false);
      expect(comp.canGoPrev()).toBe(false);
    });

    it('should can go next if there is a date available in next month when strategy is state', () => {
      comp.navigationStrategy = 'state';
      const date = moment().add(1, 'month');
      state.set(date, STATES.AVAILABLE);

      detectChanges(fixture);
      expect(comp.canGoNext()).toBe(true);
    });

    it('should can go prev if there is a date available in prev month when strategy is state', () => {
      comp.navigationStrategy = 'state';
      const date = moment().subtract(2, 'month');
      state.set(date, STATES.AVAILABLE);

      detectChanges(fixture);
      expect(comp.canGoPrev()).toBe(true);
    });

    it('should can go next if there is a date selected in next month when strategy is state', () => {
      comp.navigationStrategy = 'state';
      comp.navigationState = STATES.SELECTED;
      const date = moment().add(1, 'month');
      state.set(date, STATES.SELECTED);

      detectChanges(fixture);
      expect(comp.canGoNext()).toBe(true);
    });

    it('should can go prev if there is a date selected in prev month when strategy is state', () => {
      comp.navigationStrategy = 'state';
      comp.navigationState = STATES.SELECTED;
      const date = moment().subtract(2, 'month');
      state.set(date, STATES.SELECTED);

      detectChanges(fixture);
      expect(comp.canGoPrev()).toBe(true);
    });

  });
});
