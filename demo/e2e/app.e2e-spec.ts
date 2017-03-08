import { ZmzCalendarPage } from './app.po';

describe('zmz-calendar App', function() {
  let page: ZmzCalendarPage;

  beforeEach(() => {
    page = new ZmzCalendarPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
