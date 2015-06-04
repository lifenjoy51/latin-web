'use strict';

angular.module('latinApp.converter', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/converter', {
    templateUrl: 'converter/converter.html',
    controller: 'converterCtrl'
  });
}])

.controller('converterCtrl', ['$scope', 'localStorageService', '$http', '$location',
function($scope, localStorageService, $http, $location) {

  //저장된 유저아이디.
  var userId = localStorageService.get('userId');

  //source text.

  //장모음 변환.
  $scope.convert = function(){

    //점수처리는어떻게하나?
    $http({
      headers:{'Content-Type':'application/x-www-form-urlencoded'
      ,'Accept' : 'text/plain'},
      url:'http://106.186.121.86:8080/api/v1/convert',
      method:'POST',
      params:{
        'content' : $scope.srcText
      }
    })
    .success( function(response) {
      console.log(response);
      $scope.srcText = response;
    });

}

}]);
