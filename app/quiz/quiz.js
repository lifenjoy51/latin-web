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
  var host = 'http://106.186.121.86:8080';
  //var host = 'http://192.168.0.10:8080';

  $scope.units = new Array();
  $scope.units.push({'name':'All', 'value':0});
  $scope.unit = $scope.units[0];
  $scope.unitFrom = $scope.units[0];
  $scope.unitTo = $scope.units[0];
  $scope.quizSize = 10;

  $scope.audioUrl = '';
  $scope.played=false;

  $scope.quizzes = new Array();
  $scope.quiz = {
    answer : {}
    , choices : {}
    , quizType : {}
  };
  $scope.pos = 0;
  $scope.total = 0;
  $scope.toggleInverse = false;

  //문제와 정답이 함께 들어가 있다.
  //문제는 질문과 보기, 답으로 이루어져 있다.
  $scope.$on('$viewContentLoaded', function() {
    //등록상태를 확인한 후 등록인 경우에만 문제 보여주기.
    //아니면 메인에서 등록로직 시작.
    if((userId)){
      initUnit();
      //$scope.nextProblem('');
      initAudioEvent();
      $scope.initWords();
    }else{
      $location.path('/');
    }
  });

  //정답확인.
  $scope.choose = function(data){
    //console.log(data);
    var answer = $scope.quiz.answer.latin;
    var correct = answer == data;
    //console.log(correct);
    if(!correct){
        alert('Erratum!! \n\n'+ $scope.quiz.answer.latin +'\n\n'+ $scope.quiz.answer.english);
    }

    //점수처리는어떻게하나?
    //정답/오답/패스/ 정보를 서버에 넘기고.
    $scope.nextProblem(answer, correct);
  }

  //audio
  $scope.getAudioUrl = function(){
    var url = 'http://word.tarpan.us/files/audio/' + $scope.quiz.answer.audio;
    if(!$scope.quiz.answer.audio){
      url = 'http://api.tarpan.us/tts?q='+$scope.quiz.answer.latin;
    }
    $scope.audioUrl = url;
    //console.log(url);
    return $sce.trustAsResourceUrl(url);
  }

  //다음문제를불러온다.
  $scope.nextProblem = function(latin, correctness){
    $scope.pos = ($scope.pos+1) % $scope.quizzes.length;
    $scope.quiz = $scope.quizzes[$scope.pos];
    if($scope.pos == 0){
      $scope.total += 1;
      $scope.initWords();
    }

    var score = correctness ? '1' : '-1';
    if($scope.toggleAnswer) score=0;


    //문제형식.라틴>영어,영어>라틴.
    $scope.checkQuizType();

    //이력저장.
    var quizUrl = host+'/api/v1/quiz/hist';
    var data = $.param({
      'userId' : userId,
      'latin' : latin,
      'score' : score,
      'tp' : $scope.quiz.quizType
    });

    $http.post(quizUrl, data)
    .success( function(response) {
      console.log(response);
    })
    .error(function(data, status, headers, config) {
      //alert('error... T_T');
      console.log(data);
    });

  }

  function initUnit(){
    $http.get(host+'/api/v1/units')
    .success( function(response) {

      //
      console.log(response);
      for(var i in response){
        var unit = {
          'name' : '#'+i
          ,'value' : i
        };
        $scope.units.push(unit);
      }

      //init
      $scope.unitFrom = $scope.units[0];
      $scope.unitTo = $scope.units[0];
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
    $scope.quiz = {
        answer : {}
      , choices : {}
      , quizType : {}
    };
  }

  //문제초기화.
  $scope.initWords = function(){

      var url = host+'/api/v1/quiz/';
      $http.get(url += $scope.tp,
    {params:{
      'userId' : userId,
      'unitFrom' : $scope.unitFrom.value,
      'unitTo' : $scope.unitTo.value,
      'quizSize' : $scope.quizSize
    }})
    .success( function(response) {
      console.log(response);
      $scope.quizzes = response;
      $scope.quiz = $scope.quizzes[$scope.pos];
      $scope.checkQuizType();
    })
    .error(function(data, status, headers, config) {
      //에러나면 강제로 재등록.
      alert('error... T_T');
    });;
  }

  $scope.initPos = function(){
    $scope.pos=0;
  }

  $scope.checkQuizType = function(){

    //문제형식.라틴>영어,영어>라틴.
    if($scope.quizType == 'LaEn'){
      $scope.toggleInverse = false;
    }else if($scope.quizType == 'EnLa'){
      $scope.toggleInverse = true;
    }else{
      $scope.toggleInverse = (+Math.random())>0 ? true : false;
    }
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
