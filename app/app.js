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

.controller('mainCtrl', ['$scope', 'localStorageService','$location', '$http', '$window',
function($scope, localStorageService, $location, $http, $window) {

  //registration.
  var userId = localStorageService.get('userId');

  //registration.
  $scope.regist = function(){
    userId = prompt('Salve! 아이디(이름)을 입력하세요.');
    //사용자가 취소하면?
    if (!userId) {
      userId = prompt('아이디(이름)을 입력해주세요ᅟㅜㅜ');
      if (!userId) {
        userId = Math.floor(Date.now() / 1000)
      }
    }

    //$http.get('http://'+$location.host()+':8080/register',
    $http.get('http://106.186.121.86:8080/register',
      {params:{
        'userId' : userId
      }}
    )
    .success( function(response) {
      localStorageService.set('userId', userId);
      console.log('success');
      console.log($location);
      $window.location.reload();
    });
  };

  console.log(userId);
  if(!userId){
    $scope.regist();
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
