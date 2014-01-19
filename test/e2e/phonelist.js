'use strict';

function PhoneListPage () {
  this.all = element.all(by.repeater('phone in phones'));
}

describe('Phone catalog list', function() {
  beforeEach(function () {
    browser.get('/');
  });

  it('should hava a list of three phones', function() {
    var listPage = new PhoneListPage();

    listPage.all.then(function (phones) {
      expect(phones.length).toBeGreaterThan(1);
    });
  });
});
