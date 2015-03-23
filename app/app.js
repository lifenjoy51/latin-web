'use strict';

// Declare app level module which depends on views, and components
angular.module('latinApp', [
  'ngRoute',
  'latinApp.word',
  'latinApp.sentence',
  'latinApp.version',
  'LocalStorageModule'
])
.config(['$routeProvider','localStorageServiceProvider',
function($routeProvider, localStorageServiceProvider) {
  $routeProvider.otherwise({redirectTo: '/word'});

  localStorageServiceProvider
  .setPrefix('latinApp');
}])

.controller('mainCtrl', ['$scope', 'localStorageService','$location', '$http',
function($scope, localStorageService, $location, $http) {
  //registration.
  var userId = localStorageService.get('userId');
  console.log(userId);
  if(userId == null){
    //userId = prompt('Salve! 이름을 입력하세요.');
    userId = 'test';

    localStorageService.set('userId', userId);
  }
  $scope.userId = userId;
  //TODO regist to server.

  //$http.get('http://'+$location.host()+':8080/register',
  $http.get('http://106.186.121.86:8080/register',
  {params:{
    'userId' : userId
  }})
  .success( function(response) {
  });

  //select unit.
  //TODO server sync.
  $scope.units = [{
    id:1
    ,label:'Unit 1'
  }];
  //TODO use local storage to store selected unit.
  $scope.selectedUnit = $scope.units[0];

  //selected menu.
  $scope.getClass = function(path) {
    if ($location.path().substr(0, path.length) == path) {
      return "active"
    } else {
      return ""
    }
  }
}]);
