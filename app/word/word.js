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

  //local storage
  localStorageServiceProvider.setPrefix('latinApp');
}])

.controller('wordCtrl', ['$scope', 'localStorageService', '$http', '$location',
function($scope, localStorageService, $http, $location) {

  //저장된 유저아이디.
  var userId = localStorageService.get('userId');

  //문제와 정답이 함께 들어가 있다.
  //문제는 질문과 보기, 답으로 이루어져 있다.
  $scope.$on('$viewContentLoaded', function() {
    //call it here
    nextProblem('');
  });

  //정답확인.
  $scope.choose = function(data){
    //console.log(data);
    var answer = $scope.question.answer.titleWord;
    var correct = answer == data;
    //console.log(correct);
    if(!correct){
        alert('Erratum!! \n'+ $scope.question.answer.korean +' '+ $scope.question.answer.english);
    }

    //점수처리는어떻게하나?
    //정답/오답/패스/ 정보를 서버에 넘기고.
    nextProblem(answer, correct);
  }

  //다음문제를불러온다.
  function nextProblem(titleWord, correctness){
    var score = correctness ? '1' : '-1';
    //아이디와... 설정들을가져간다.
    //TODO 임시데이터.
    //$http.get('http://'+$location.host()+':8080/next').success( function(response) {
    $http.get('http://192.168.0.5:8080/next',
    {params:{
      'userId' : userId,
      'titleWord' : titleWord,
      'score' : score
    }})
    .success( function(response) {
      $scope.question = response;
    });

  }

}]);
