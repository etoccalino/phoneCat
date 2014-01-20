'use strict';

function PhoneListPage () {
  this.all = element.all(by.repeater('phone in phones'));

  this.first = function () {
    return element(by.repeater('phone in phones').row(0));
  }

  this.orderBy = function (order) {
    element(by.css('option[value="' + order + '"]')).click();
  }

  this.filterBy = function (query) {
    element(by.input('query')).sendKeys(query);
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
    listPage.filterBy('nexus');
    listPage.all.then(function (phones) {
      expect(phones.length).toBe(1);
    });
  });

  it('allows to filter the Motorola', function () {
    var listPage = new PhoneListPage();
    listPage.filterBy('motorola');
    listPage.all.then(function (phones) {
      expect(phones.length).toBe(2);
    });
  });

  it('ensures order does not kill results', function () {
    var listPage = new PhoneListPage();
    listPage.all.then(function (phones) {
      var len = phones.length;
      listPage.orderBy('name');
      listPage.all.then(function (phones) {
        expect(phones.length).toBe(len);
      });
    });
  });

  it('orders alphabetically, moving the Nexus S to the bottom', function () {
    var listPage = new PhoneListPage();
    var firstName = listPage.first().getText();
    expect(firstName).toMatch(/Nexus S.*/);
    listPage.orderBy('name');
    expect(listPage.first().getText()).not.toMatch(/Nexus S.*/);
  });
});
