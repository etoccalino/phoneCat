'use strict';

describe('Controller: PhoneListCtrl', function () {

  // load the controller's module
  beforeEach(module('phoneCatApp'));

  var PhoneListCtrl, scope, $httpBackend;
  var phonesFixture = [
    { name: 'Nexus S', snippet: 'Da Nexusss' },
    { name: 'Motorola Razr i', snippet: 'Will break the crystal before you know it!' }
  ];

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _$httpBackend_) {
    scope = $rootScope.$new();
    PhoneListCtrl = $controller('PhoneListCtrl', {
      $scope: scope
    });

    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('data/phones.json').respond(phonesFixture);
  }));

  it('should attach a list of phones', function () {
    expect(scope.phones).toBeUndefined();
    $httpBackend.flush();
    expect(scope.phones).toEqual(phonesFixture);
  });

  it('should have "age" as default order property', function () {
    expect(scope.orderProp).toBe('age');
  });
});
