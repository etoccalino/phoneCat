'use strict';

angular.module('phoneCatApp')
  .controller('PhoneListCtrl', ['$scope', '$http', function ($scope, $http) {
    $http.get('data/phones.json').success(function (data) {
      $scope.phones = data;
    });
    $scope.query = '';
    $scope.orderProp = 'age';
  }]);
