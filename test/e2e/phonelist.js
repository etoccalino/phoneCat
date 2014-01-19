'use strict';

function PhoneListPage () {
  this.all = element.all(by.repeater('phone in phones'));

  this.filter = function (query) {
    element(by.model("query")).sendKeys(query);
  }
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

  it('allows to filter the Nexus', function () {
    var listPage = new PhoneListPage();
    listPage.filter('nexus');
    listPage.all.then(function (phones) {
      expect(phones.length).toBe(1);
    });
  });

  it('allows to filter the Motorola', function () {
    var listPage = new PhoneListPage();
    listPage.filter('motorola');
    listPage.all.then(function (phones) {
      expect(phones.length).toBe(2);
    });
  });
});
