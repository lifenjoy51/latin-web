'use strict';

angular.module('latinApp.quiz', [
'ngRoute',
'LocalStorageModule'
])

.config(['$routeProvider','localStorageServiceProvider',
  function($routeProvider, localStorageServiceProvider) {
  $routeProvider.when('/quiz', {
    templateUrl: 'quiz/quiz.html',
    controller: 'quizCtrl'
  });

  //local storage
  localStorageServiceProvider.setPrefix('latinApp');
}])

.controller('quizCtrl', ['$scope', 'localStorageService', '$http', '$location', '$route', '$sce',
function($scope, localStorageService, $http, $location, $route, $sce) {

  //저장된 유저아이디.
  var userId = localStorageService.get('userId');

  $scope.question = {answer:''};
  $scope.units = new Array();
  $scope.units.push({'name':'All', 'value':0});
  $scope.unit = $scope.units[0];
  $scope.audioUrl = '';
  $scope.played=false;

  //문제와 정답이 함께 들어가 있다.
  //문제는 질문과 보기, 답으로 이루어져 있다.
  $scope.$on('$viewContentLoaded', function() {
    //등록상태를 확인한 후 등록인 경우에만 문제 보여주기.
    //아니면 메인에서 등록로직 시작.
    if((userId)){
      initUnit();
      $scope.nextProblem('');
      initAudioEvent();
    }else{
      $location.path('/');
    }
  });

  //정답확인.
  $scope.choose = function(data){
    //console.log(data);
    var answer = $scope.question.answer.latin;
    var correct = answer == data;
    //console.log(correct);
    if(!correct){
        alert('Erratum!! \n'+ $scope.question.answer.korean +' '+ $scope.question.answer.english);
    }

    //점수처리는어떻게하나?
    //정답/오답/패스/ 정보를 서버에 넘기고.
    $scope.nextProblem(answer, correct);
  }

  //audio
  $scope.getAudioUrl = function(){
    var url = 'http://word.tarpan.us/files/audio/' + $scope.question.answer.audio;
    if(!$scope.question.answer.audio){
      url = 'http://api.tarpan.us/tts?q='+$scope.question.answer.latin;
    }
    $scope.audioUrl = url;
    //console.log(url);
    return $sce.trustAsResourceUrl(url);
  }

  //다음문제를불러온다.
  $scope.nextProblem = function(latin, correctness){
    var score = correctness ? '1' : '-1';
    if($scope.toggleAnswer) score=0;
    //아이디와... 설정들을가져간다.
    //TODO 임시데이터.
    //$http.get('http://'+$location.host()+':8080/next',
    var quizUrl;
    if($scope.div == 'word'){  //word
      quizUrl = 'http://106.186.121.86:8080/api/v1/words/next';
    } else if($scope.div == 'sentence'){ //sentence
      quizUrl = 'http://106.186.121.86:8080/api/v1/sentences/next';
    } else{
      quizUrl = Math.round(Math.random()) == 0
      ? 'http://106.186.121.86:8080/api/v1/sentences/next'
      : 'http://106.186.121.86:8080/api/v1/words/next'
    }
    $http.get(quizUrl,
    {params:{
      'userId' : userId,
      'latin' : latin,
      'score' : score,
      'unit' : $scope.unit.value
    }})
    .success( function(response) {
      $scope.question = response;
    })
    .error(function(data, status, headers, config) {
      //에러나면 강제로 재등록.
      alert('error... T_T');
    });;

  }

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

  function initAudioEvent(){
    var vid = document.getElementById("audio");
    vid.onplay = function() {
      console.log('init');
      if(!$scope.played){
        alert('음성 재생은 데이터를 많이 사용합니다. 단어 30개에 1MB 정도.');
        $scope.played = true;
      }
    };
  }

  //set audio autoplay
  $scope.$watch('toggleAutoplay', function(newvalue) {
    console.log('autoplay');
    var audio = document.getElementById("audio");
    audio.autoplay=$scope.toggleAutoplay;
    if(newvalue){
      alert('음성 재생은 데이터를 많이 사용합니다. 단어 30개에 1MB 정도.');
    }
  });

  //inverse 할 때 깜박임 방지.
  $scope.hideProblem = function(){
    $scope.question = {
        answer : {}
      , choices : {}
      , info : {}
    };
  }

}])
.run(['$rootScope','$templateCache',function($rootScope, $templateCache) {
  $rootScope.$on('$routeChangeStart', function(event, next, current) {
    if (typeof(current) !== 'undefined'){
      $templateCache.remove(current.templateUrl);
    }
  });
}]);
;
