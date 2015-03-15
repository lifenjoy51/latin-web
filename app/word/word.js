'use strict';

angular.module('latinApp.word', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/word', {
    templateUrl: 'word/word.html',
    controller: 'wordCtrl'
  });
}])

.controller('wordCtrl', [function() {

}]);
