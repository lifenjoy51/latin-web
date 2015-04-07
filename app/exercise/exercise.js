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
    init();
  });

  //정답확인.
  $scope.choose = function(data){
  }

  function init(){
    $scope.exercises = [
    , { 'unit' : 1 ,'seq' : 7 ,'latin' : 'monent me: si: erro:.' ,'english' : 'they warn me if I err.'}
    , { 'unit' : 1 ,'seq' : 8 ,'latin' : 'monet me: si: errant.' ,'english' : 'he warns me if they err.'}
    , { 'unit' : 1 ,'seq' : 9 ,'latin' : 'mone:te me: si: errat.' ,'english' : 'warn me if he errs.'}
    , { 'unit' : 1 ,'seq' : 10 ,'latin' : 'de:be:s mone:re me:.' ,'english' : 'you ought to warn me.'}
    , { 'unit' : 1 ,'seq' : 11 ,'latin' : 'de:be:tis serva:re me:.' ,'english' : 'you ought to save me.'}
    , { 'unit' : 1 ,'seq' : 12 ,'latin' : 'no:n de:bent lauda:re me:.' ,'english' : 'they ought not to praise me.'}
    , { 'unit' : 1 ,'seq' : 13 ,'latin' : 'quid dat? saepe nihil dat.' ,'english' : 'what does he give? he often gives nothing.'}
    , { 'unit' : 1 ,'seq' : 14 ,'latin' : 'me: saepe vocant et monent.' ,'english' : 'they often call me and advise me.'}
    , { 'unit' : 1 ,'seq' : 15 ,'latin' : 'nihil video:. quid vide:s?' ,'english' : 'I see nothing. what do you see?'}
    , { 'unit' : 1 ,'seq' : 16 ,'latin' : 'me: lauda: si: no:n erro:, ama:bo: te:.' ,'english' : 'praise me, please, if I do not make a mistake.'}
    , { 'unit' : 1 ,'seq' : 17 ,'latin' : 'si: vale:tis, vale:mus.' ,'english' : 'if you are well, we are well.'}
    , { 'unit' : 1 ,'seq' : 18 ,'latin' : 'si: valet, valeo:.' ,'english' : 'if he is well, I am well.'}
    , { 'unit' : 1 ,'seq' : 19 ,'latin' : 'si: me: amat, de:bet me: lauda:re.' ,'english' : 'if he(she) loves me, he(she) ought to praise me.'}
    , { 'unit' : 1 ,'seq' : 20 ,'latin' : 'co:nserva:te me:.' ,'english' : 'save me.'}
    , { 'unit' : 1 ,'seq' : 21 ,'latin' : 'no:n de:beo: erra:re.' ,'english' : 'I ought not to err.'}
    , { 'unit' : 1 ,'seq' : 22 ,'latin' : 'quid de:be:mus lauda:re?' ,'english' : 'what ought we to praise?'}
    , { 'unit' : 1 ,'seq' : 23 ,'latin' : 'videt; co:gitat; monet.' ,'english' : 'he sees; he ponders; he advises.'}
    , { 'unit' : 2 ,'seq' : 9 ,'latin' : 'vale:, patria mea.' ,'english' : 'goodbye, my native land.'}
    , { 'unit' : 2 ,'seq' : 10 ,'latin' : 'fortu:na puellae est magna.' ,'english' : 'the fortune of the girl is great.'}
    , { 'unit' : 2 ,'seq' : 11 ,'latin' : 'puella fortu:nam patriae tuae laudat.' ,'english' : 'the girl is praising the fortune of your country.'}
    , { 'unit' : 2 ,'seq' : 12 ,'latin' : 'O: puella, patriam tuam serva:.' ,'english' : 'O girl, save your country.'}
    , { 'unit' : 2 ,'seq' : 13 ,'latin' : 'multae puellae pecu:niam amant.' ,'english' : 'many girls love money.'}
    , { 'unit' : 2 ,'seq' : 14 ,'latin' : 'puellae nihil datis.' ,'english' : 'you are giving nothing to the girl.'}
    , { 'unit' : 2 ,'seq' : 15 ,'latin' : 'pecu:niam puellae videt.' ,'english' : 'he sees the money of the girl.'}
    , { 'unit' : 2 ,'seq' : 16 ,'latin' : 'pecu:niam puella:rum no:n vide:s.' ,'english' : 'you do not see the girls\' money'}
    , { 'unit' : 2 ,'seq' : 17 ,'latin' : 'mone:re puella:s de:be:mus.' ,'english' : 'we ought to warn the girls.'}
    , { 'unit' : 2 ,'seq' : 18 ,'latin' : 'lauda:re puellam de:bent.' ,'english' : 'they ought to praise the girl.'}
    , { 'unit' : 2 ,'seq' : 19 ,'latin' : 'vi:ta multi:s puelli:s fortu:nam dat.' ,'english' : 'life gives fortune to many girls.'}
    , { 'unit' : 2 ,'seq' : 20 ,'latin' : 'vi:tam meam pecu:nia: tua: co:nserva:s.' ,'english' : 'you are saving my life by(with) your money.'}
    , { 'unit' : 2 ,'seq' : 21 ,'latin' : 'fa:ma est nihil sine fortu:na:.' ,'english' : 'fame is nothing without fortune.'}
    , { 'unit' : 2 ,'seq' : 22 ,'latin' : 'vi:tam sine pecu:nia: no:n ama:tis.' ,'english' : 'you do not like life without money.'}
    , { 'unit' : 2 ,'seq' : 23 ,'latin' : 'sine fa:ma: et fortu:na: patria no:n valet.' ,'english' : 'a country is not strong without fame and fortune.'}
    , { 'unit' : 2 ,'seq' : 24 ,'latin' : 'i:ram puella:rum lauda:re no:n de:be:s.' ,'english' : 'you ought not to praise the anger of the girls.'}
    , { 'unit' : 2 ,'seq' : 25 ,'latin' : 'vi:tam sine poeni:s ama:mus.' ,'english' : 'we like a life without punishments.'}
    , { 'unit' : 2 ,'seq' : 26 ,'latin' : 'sine philosophia: no:n vale:mus.' ,'english' : 'we are not strong without philosophy.'}
    , { 'unit' : 2 ,'seq' : 27 ,'latin' : 'quid est vi:ta sine philosophia:?' ,'english' : 'what is life without philosophy?'}
    , { 'unit' : 3 ,'seq' : 7 ,'latin' : 'Vale:, mi: ami:ce.' ,'english' : 'Good-bye, my friend.'}
    , { 'unit' : 3 ,'seq' : 8 ,'latin' : 'Populus Ro:ma:nus sapientiam fi:lii: tui: laudat.' ,'english' : 'The Roman people praise your son\'s wisdom.'}
    , { 'unit' : 3 ,'seq' : 9 ,'latin' : 'O: vir magne, populum Ro:ma:num serva:.' ,'english' : 'O great man, save the Roman people.'}
    , { 'unit' : 3 ,'seq' : 10 ,'latin' : 'Numberus populi: Ro:ma:ni: est magnus.' ,'english' : 'The number of the Roman people is great.'}
    , { 'unit' : 3 ,'seq' : 11 ,'latin' : 'Multi: pueri: puella:s amant.' ,'english' : 'Many boys love girls.'}
    , { 'unit' : 3 ,'seq' : 12 ,'latin' : 'Fi:lio: meo: nihil datis.' ,'english' : 'You are giving nothing to my son.'}
    , { 'unit' : 3 ,'seq' : 13 ,'latin' : 'Viro:s in agro: video:' ,'english' : 'I see men in the field.'}
    , { 'unit' : 3 ,'seq' : 14 ,'latin' : 'Ami:cum fi:lii: mei: vide:s.' ,'english' : 'You see the friend of my son.'}
    , { 'unit' : 3 ,'seq' : 15 ,'latin' : 'Ami:cum fi:lio:rum tuo:rum no:n videt.' ,'english' : 'He does not see your sons\' friend.'}
    , { 'unit' : 3 ,'seq' : 16 ,'latin' : 'De:be:mus fi:lio:s meo:s mone:re.' ,'english' : 'We ought to warn my sons.'}
    , { 'unit' : 3 ,'seq' : 17 ,'latin' : 'De:bent fi:lium tuum lauda:re.' ,'english' : 'They ought to praise your son.'}
    , { 'unit' : 3 ,'seq' : 18 ,'latin' : 'Vi:ta pauci:s viri:s fa:mam dat.' ,'english' : 'Life gives fame to few men.'}
    , { 'unit' : 3 ,'seq' : 19 ,'latin' : 'Me: in numero: ami:co:rum tou:rum habe:s.' ,'english' : 'You consier me in the number of your friends.'}
    , { 'unit' : 3 ,'seq' : 20 ,'latin' : 'Viri: magni: pauco:s ami:co:s saepe habent.' ,'english' : 'Great men often have few friends.'}
    , { 'unit' : 3 ,'seq' : 21 ,'latin' : 'Ami:cus meus semper co:gitat.' ,'english' : 'My friend is always thinking.'}
    , { 'unit' : 3 ,'seq' : 22 ,'latin' : 'Fi:lius magni: viri: no:n semper est magnus vir.' ,'english' : 'The son of a great man is not always a great man.'}
    , { 'unit' : 3 ,'seq' : 23 ,'latin' : 'Sapientiam magno:rum viro:rum no:n semper vide:mus.' ,'english' : 'We do not always see the wisdom of great men.'}
    , { 'unit' : 3 ,'seq' : 24 ,'latin' : 'Philosophiam, sapientiam magno:rum viro:rum, lauda:re de:be:tis.' ,'english' : 'You ought to praise philosophy, the wisdom of great men.'}
    , { 'unit' : 4 ,'seq' : 8 ,'latin' : 'O:tium est bonum.' ,'english' : 'Peace is good.'}
    , { 'unit' : 4 ,'seq' : 9 ,'latin' : 'Multa bella o:tium no:n co:nservant.' ,'english' : 'Many wars do not preserve peace.'}
    , { 'unit' : 4 ,'seq' : 10 ,'latin' : 'Peri:culum est magnum.' ,'english' : 'The danger is great.'}
    , { 'unit' : 4 ,'seq' : 11 ,'latin' : 'In magno: peri:culo: sumus.' ,'english' : 'We are in great danger.'}
    , { 'unit' : 4 ,'seq' : 12 ,'latin' : 'Et o:tium peri:cula saepe habet.' ,'english' : 'And leisure often has dangers.'}
    , { 'unit' : 4 ,'seq' : 13 ,'latin' : 'Vi:ta no:n est sine multi:s peri:culi:s.' ,'english' : 'Life is not without many dangers.'}
    , { 'unit' : 4 ,'seq' : 14 ,'latin' : 'Boni: viri: o:tium amant.' ,'english' : 'Good men love peace.'}
    , { 'unit' : 4 ,'seq' : 15 ,'latin' : 'Stultus vir peri:cula belli: laudat.' ,'english' : 'The foolish man praises the dangers of war.'}
    , { 'unit' : 4 ,'seq' : 16 ,'latin' : 'O:tium bello: saepe no:n co:nserva:mus.' ,'english' : 'Often we do not preserve the peace by war.'}
    , { 'unit' : 4 ,'seq' : 17 ,'latin' : 'Populus Ro:ma:nus o:tium bonum no:n semper habet.' ,'english' : 'The Roman people do not always have good peace.'}
    , { 'unit' : 4 ,'seq' : 18 ,'latin' : 'Patriam et o:tium belli:s parvi:s saepe servant.' ,'english' : 'They often save the fatherland and peace by small wars.'}
    , { 'unit' : 4 ,'seq' : 19 ,'latin' : 'Multae puellae sunt bellae.' ,'english' : 'Many girls are pretty.'}
    , { 'unit' : 4 ,'seq' : 20 ,'latin' : 'Ve:ri: ami:ci: sunt pauci:.' ,'english' : 'True friends are few.'}
    , { 'unit' : 4 ,'seq' : 21 ,'latin' : 'Ami:cus meus est vir magni: officii:.' ,'english' : 'My friends is a man of great service.'}
    , { 'unit' : 4 ,'seq' : 22 ,'latin' : 'Officia magistri: sunt multa et magna.' ,'english' : 'The duties of a teacher are many and great.'}
    , { 'unit' : 4 ,'seq' : 23 ,'latin' : 'Vir parvi: o:tii: es.' ,'english' : 'You are a man of little leisure.'}
    , { 'unit' : 4 ,'seq' : 24 ,'latin' : 'Viri: magnae cu:rae estis.' ,'english' : 'You are men of great care.'}
    , { 'unit' : 4 ,'seq' : 25 ,'latin' : 'Sine mora: cu:ram officio: dare de:be:mus.' ,'english' : 'We ought to give attention to duty without delay.'}
    , { 'unit' : 4 ,'seq' : 26 ,'latin' : 'Sine oculi:s vi:ta est nihil.' ,'english' : 'Life is nothing without eyes.'}
    ];
  };

}])
;
