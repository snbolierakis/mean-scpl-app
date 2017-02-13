import { MeanScplAppPage } from './app.po';

describe('mean-scpl-app App', function() {
  let page: MeanScplAppPage;

  beforeEach(() => {
    page = new MeanScplAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
