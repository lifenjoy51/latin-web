'use strict';

// Declare app level module which depends on views, and components
angular.module('latinApp', [
  'ngRoute',
  'latinApp.word',
  'latinApp.sentence',
  'latinApp.version'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/word'});
}]);
