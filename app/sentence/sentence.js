'use strict';

angular.module('latinApp.sentence', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/sentence', {
    templateUrl: 'sentence/sentence.html',
    controller: 'sentenceCtrl'
  });
}])

.controller('sentenceCtrl', [function() {

}]);
