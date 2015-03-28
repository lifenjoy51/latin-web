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

.controller('wordCtrl', ['$scope', 'localStorageService', '$http', '$location', '$route', '$sce',
function($scope, localStorageService, $http, $location, $route, $sce) {

  //저장된 유저아이디.
  var userId = localStorageService.get('userId');

  //문제와 정답이 함께 들어가 있다.
  //문제는 질문과 보기, 답으로 이루어져 있다.
  $scope.$on('$viewContentLoaded', function() {
    //등록상태를 확인한 후 등록인 경우에만 문제 보여주기.
    //아니면 메인에서 등록로직 시작.
    if((userId)){
      nextProblem('');
    }else{
      $location.path('/');
    }
  });

  $scope.question = {answer:''};

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

  //audio
  $scope.getAudioUrl = function(){
    var url = 'http://word.tarpan.us/files/audio/' + $scope.question.answer.audio;
    if(!$scope.question.answer.audio){
      url = 'http://54.92.94.180/api/tts?q='+$scope.question.answer.titleWord;
    }
    //console.log(url);
    return $sce.trustAsResourceUrl(url);
  }

  //다음문제를불러온다.
  function nextProblem(titleWord, correctness){
    var score = correctness ? '1' : '-1';
    if($scope.toggleAnswer) score=0;
    //아이디와... 설정들을가져간다.
    //TODO 임시데이터.
    //$http.get('http://'+$location.host()+':8080/next',
    $http.get('http://106.186.121.86:8080/next',
    {params:{
      'userId' : userId,
      'titleWord' : titleWord,
      'score' : score
    }})
    .success( function(response) {
      $scope.question = response;
    })
    .error(function(data, status, headers, config) {
      //에러나면 강제로 재등록.
      localStorageService.set('userId', null);
      $location.path('/');
    });;

  }

}]);
