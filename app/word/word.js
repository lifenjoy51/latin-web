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

.controller('wordCtrl', ['$scope', 'localStorageService', '$http', '$location', '$route', '$sce', '$timeout',
function($scope, localStorageService, $http, $location, $route, $sce, $timeout) {

  //저장된 유저아이디.
  var userId = localStorageService.get('userId');
  $scope.units = new Array();
  $scope.units.push({'name':'-', 'value':1});
  $scope.unit = $scope.units[0];
  $scope.audioUrl = '';
  $scope.played=false;

  $scope.words = new Array();
  $scope.word = {};
  $scope.pos = 0;
  $scope.total = 0;

  var promise;

  //문제와 정답이 함께 들어가 있다.
  //문제는 질문과 보기, 답으로 이루어져 있다.
  $scope.$on('$viewContentLoaded', function() {
      initUnit();
      initAudioEvent();
      $scope.initWords();
  });

  //audio
  $scope.getAudioUrl = function(){
    var url = 'http://word.tarpan.us/files/audio/' + $scope.word.audio;
    if(!$scope.word.audio){
      url = 'http://api.tarpan.us/tts?q='+$scope.word.titleWord;
    }
    $scope.audioUrl = url;
    //console.log(url);
    return $sce.trustAsResourceUrl(url);
  }

  //다음문제를불러온다.
  $scope.next = function(){
    //console.log($scope.pos);
    //console.log($scope.words.length);
    //console.log($scope.word);
    $scope.pos = ($scope.pos+1) % $scope.words.length;
    $scope.word = $scope.words[$scope.pos];
    if($scope.pos == 0){
      $scope.total += 1;
      $scope.initWords();
    }

    //자동넘어가기.
    $timeout.cancel(promise); //이전삭제.

    if($scope.toggleAutoNext){
      if(!$scope.toggleAutoplay){
        promise = $timeout(function() {
          //do next
          console.log('do next.');
          $scope.next();
        }, (+$scope.delaySecond)); // delay
      }
    }
  }

  $scope.initPos = function(){
    $scope.pos=0;
  }

  $scope.initWords = function(){

    $http.get('http://106.186.121.86:8080/api/v1/words/study',
      {params:{
        'unit' : $scope.unit.value
      }})
      .success( function(response) {
        console.log(response);
        $scope.words = response;
        $scope.word = $scope.words[$scope.pos];
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
      for(var i in response){
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

  //next..
  $scope.autoNext = function(){

    var delay = 0;
    var audio = document.getElementById("audio");
    var duration = audio.duration;
    if(!duration) duration = 1;
    delay = (+duration*1000) + (+$scope.delaySecond);

    //console.log(audio.currentSrc.indexOf($scope.word.audio));
    //console.log(duration);
    //console.log(duration*1000);
    //console.log($scope.delaySecond);
    //console.log(delay);

    promise = $timeout(function() {
      //do next
      console.log('do next. autoNext');
      $scope.next();
    }, delay); // delay
  }

  document.getElementById("audio").oncanplay = function(){
      console.log('do next. event!!!');
      if($scope.toggleAutoNext){
        if($scope.toggleAutoplay){
          $scope.autoNext();
        }
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
