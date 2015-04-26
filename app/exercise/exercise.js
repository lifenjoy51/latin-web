'use strict';

angular.module('latinApp.exercise', [
'ngRoute',
'LocalStorageModule'
])

.config(['$routeProvider','localStorageServiceProvider',
  function($routeProvider, localStorageServiceProvider) {
  $routeProvider.when('/exercise', {
    templateUrl: 'exercise/exercise.html',
    controller: 'exerciseCtrl'
  });

  //local storage
  localStorageServiceProvider.setPrefix('latinApp');
}])

.controller('exerciseCtrl', ['$scope', 'localStorageService', '$http', '$location', '$route', '$sce',
function($scope, localStorageService, $http, $location, $route, $sce) {

  //저장된 유저아이디.
  var userId = localStorageService.get('userId');

  $scope.exercises = [];
  $scope.showLatin = true;
  $scope.showEnglish = true;
  $scope.units = new Array();

  $scope.toggleLatin = function(){
    angular.forEach($scope.exercises, function(v, k) {
      try{
        v.showLatin = $scope.showLatin;
      }catch(e){
      }
    });
    $scope.showLatin = $scope.showLatin ? false : true;

  }

  $scope.toggleEnglish = function(){
    angular.forEach($scope.exercises, function(v, k) {
      try{
        v.showEnglish = $scope.showEnglish;
      }catch(e){
      }
    });
    $scope.showEnglish = $scope.showEnglish ? false : true;

  }

  //문제와 정답이 함께 들어가 있다.
  //문제는 질문과 보기, 답으로 이루어져 있다.
  $scope.$on('$viewContentLoaded', function() {
    initUnit();
  });

  //정답확인.
  $scope.choose = function(data){
  }

  $scope.drawList = function(){
    console.log('draw???' + $scope.unit.value);
    $http.get('http://106.186.121.86:8080/api/v1/sentences/study',
      {params:{
        'unit' : $scope.unit.value
      }})
      .success( function(response) {
        $scope.exercises = response;
        //보이는거초기화.
        $scope.showLatin = true;
        $scope.showEnglish = true;        
        $scope.toggleEnglish();
      });
  };



  function initUnit(){
    //$http.get('http://'+$location.host()+':8080/next',
    $http.get('http://106.186.121.86:8080/api/v1/units')
    .success( function(response) {
      for(var i=1; i<response; i++){
        var unit = {
          'name' : 'Unit '+i
          ,'value' : i
        };
        $scope.units.push(unit);
      }
    });
  };

}])
;
