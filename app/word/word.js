'use strict';

angular.module('latinApp.word', [
'ngRoute',
'LocalStorageModule'
])

.config(['$routeProvider','localStorageServiceProvider',
  function($routeProvider, localStorageServiceProvider) {
  $routeProvider.when('/word', {
    templateUrl: 'word/word.html',
    controller: 'wordCtrl'
  });

  localStorageServiceProvider
  .setPrefix('latinApp');
}])

.controller('wordCtrl', ['$scope', 'localStorageService',
function($scope, localStorageService) {

}]);
