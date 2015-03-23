'use strict';

// Declare app level module which depends on views, and components
angular.module('latinApp', [
  'ngRoute',
  'latinApp.word',
  'latinApp.converter',
  'latinApp.version',
  'LocalStorageModule'
])
.config(['$routeProvider','localStorageServiceProvider',
function($routeProvider, localStorageServiceProvider) {
  //$routeProvider.otherwise({redirectTo: '/word'});

  localStorageServiceProvider
  .setPrefix('latinApp');
}])

.controller('mainCtrl', ['$scope', 'localStorageService','$location', '$http',
function($scope, localStorageService, $location, $http) {
  //test!!
  //localStorageService.set('userId', null);
  //localStorageService.set('registered', null);

  //registration.
  var userId = localStorageService.get('userId');
  var registered = localStorageService.get('registered');

  console.log(userId);
  if(!(registered)){
    userId = prompt('Salve! 이름을 입력하세요.');
    localStorageService.set('userId', userId);

    //$http.get('http://'+$location.host()+':8080/register',
    $http.get('http://106.186.121.86:8080/register',
    {params:{
      'userId' : userId
    }})
    .success( function(response) {
      localStorageService.set('registered', true);
      console.log('success');
      $location.path('/word');
    });
  }else{
    console.log('else');
    $location.path('/word');
  }

  $scope.userId = userId;
  //TODO regist to server.

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
