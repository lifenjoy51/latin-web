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

  localStorageServiceProvider.setPrefix('latinApp');
}])

.controller('wordCtrl', ['$scope', 'localStorageService',
function($scope, localStorageService) {

  //문제와 정답이 함께 들어가 있다.
  //문제는 질문과 보기, 답으로 이루어져 있다.

  $scope.question = {
    content : 'amo, amare, amavi, amatum.',
    answer : 'amore',
    choices : [
      {
        text : '좋아하다'
        ,id : 'amore'
      },{
        text : '충고하다'
        ,id : 'debeo'
      },{
        text : '칭찬하다'
        ,id : 'laudo'
      }
    ]
  };

  //정답확인.
  $scope.choose = function(data){
    console.log(data);
    var correct = $scope.question.answer == data;
    console.log(correct);

    //다음문제를불러온다.

    //점수처리는어떻게하나?
  }
}]);
