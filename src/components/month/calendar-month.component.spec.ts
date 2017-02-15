import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';

import { STATES } from '../../services';
import { CalendarDayComponent } from '../day';
import { CalendarMonthComponent } from './calendar-month.component';

describe('calenda-month component', () => {
  let comp:    CalendarMonthComponent;
  let fixture: ComponentFixture<CalendarMonthComponent>;
  let de:      DebugElement;
  let el:      HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        CalendarDayComponent,
        CalendarMonthComponent
      ]
    });

    fixture = TestBed.createComponent(CalendarMonthComponent);

    comp = fixture.componentInstance;
  });

  it('should call buildMonth onInit', () => {
    comp.month = 2;
    comp.year = 2017;

    const spy = spyOn(comp, 'buildMonth').and.callThrough();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  });

  it('should call stateFn for each day of the month', () => {
    const stateFn = function(date: any) { return []; }
    comp.month = 2;
    comp.year = 2017;
    comp.stateFn = stateFn; 
    

    const spy = spyOn(comp, 'stateFn').and.callThrough();
    fixture.detectChanges();
    const times = comp.weeks.length * comp.weeks[0].length;


    expect(spy).toHaveBeenCalledTimes(times);
  });

  it('should call selectDate on date click', () => {
    const stateFn = function(date: any) { return [STATES.AVAILABLE]; }
    comp.month = 2;
    comp.year = 2017;
    comp.stateFn = stateFn; 
    comp.completeMonth = true;
    
    fixture.detectChanges();

    de = fixture.debugElement.query(By.css('.available'));

    const spy = spyOn(comp.dateSelected, 'emit').and.callThrough();
    de.triggerEventHandler('click', null);

    expect(spy).toHaveBeenCalledWith(comp.weeks[0][0]);
  });

  it('should not emit date outside of month if completeMonth = false', () => {
    const stateFn = function(date: any) { return [STATES.AVAILABLE]; }
    comp.month = 2;
    comp.year = 2017;
    comp.stateFn = stateFn; 
    comp.completeMonth = false;
    
    fixture.detectChanges();

    de = fixture.debugElement.query(By.css('.other-month'));

    const spy = spyOn(comp.dateSelected, 'emit').and.callThrough();
    de.triggerEventHandler('click', null);

    expect(spy).not.toHaveBeenCalled();
  });

  describe('navigation', () =>{
    it('should go to next month when calling next()', () => {
      comp.month = 2;
      comp.year = 2017;
      fixture.detectChanges();

      comp.next();
      fixture.detectChanges();

      expect(comp.month).toBe(3);
      expect(comp.year).toBe(2017);
    });

    it('should go to month 1 and next when calling next()', () => {
      comp.month = 12;
      comp.year = 2017;
      fixture.detectChanges();

      comp.next();
      fixture.detectChanges();

      expect(comp.month).toBe(1);
      expect(comp.year).toBe(2018);
    });

    it('should go to prev month when calling prev()', () => {
      comp.month = 2;
      comp.year = 2017;
      fixture.detectChanges();

      comp.prev();
      fixture.detectChanges();

      expect(comp.month).toBe(1);
      expect(comp.year).toBe(2017);
    });

    it('should go to month 12 and prev when calling prev()', () => {
      comp.month = 1;
      comp.year = 2017;
      fixture.detectChanges();

      comp.prev();
      fixture.detectChanges();

      expect(comp.month).toBe(12);
      expect(comp.year).toBe(2016);
    });

  });
});