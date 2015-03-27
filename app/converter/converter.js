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
    $http.post(
      'http://106.186.121.86:8080/convert',
      {params:{
        'content' : $scope.srcText
      }}
    )
    .success( function(response) {
      $scope.srcText = response;
    });

}

}]);
