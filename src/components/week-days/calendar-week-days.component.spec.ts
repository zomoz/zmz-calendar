import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';

import { CalendarWeekDaysComponent } from './calendar-week-days.component';

describe('calenda-week-days component', () => {
  let comp:    CalendarWeekDaysComponent;
  let fixture: ComponentFixture<CalendarWeekDaysComponent>;
  let de:      DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        CalendarWeekDaysComponent
      ]
    });

    fixture = TestBed.createComponent(CalendarWeekDaysComponent);

    comp = fixture.componentInstance;
  });

  it('should call weekDaySelect on day click', () => {
    comp.clickable = true;
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('.week-day'));

    const spy = spyOn(comp.weekday, 'emit').and.callThrough();
    de.triggerEventHandler('click', null);

    const firstDay = 0;
    expect(spy).toHaveBeenCalledWith(firstDay);
  });

  it('should not call weekDaySelect on day click if clickable = false', () => {
    comp.clickable = false;
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('.week-day'));


    const spy = spyOn(comp.weekday, 'emit').and.callThrough();
    de.triggerEventHandler('click', null);

    const firstDay = 0;
    expect(spy).not.toHaveBeenCalled();
  });

});