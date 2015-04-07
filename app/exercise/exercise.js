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
    $scope.toggleEnglish();
  });

  //정답확인.
  $scope.choose = function(data){
  }

  function init(){
    $scope.exercises = [
    , { 'unit' : 1 ,'seq' : 7 ,'latin' : 'monent mē sī errō.' ,'english' : 'they warn me if I err.'}
    , { 'unit' : 1 ,'seq' : 8 ,'latin' : 'monet mē sī errant.' ,'english' : 'he warns me if they err.'}
    , { 'unit' : 1 ,'seq' : 9 ,'latin' : 'monēte mē sī errat.' ,'english' : 'warn me if he errs.'}
    , { 'unit' : 1 ,'seq' : 10 ,'latin' : 'dēbēs monēre mē.' ,'english' : 'you ought to warn me.'}
    , { 'unit' : 1 ,'seq' : 11 ,'latin' : 'dēbētis servāre mē.' ,'english' : 'you ought to save me.'}
    , { 'unit' : 1 ,'seq' : 12 ,'latin' : 'nōn dēbent laudāre mē.' ,'english' : 'they ought not to praise me.'}
    , { 'unit' : 1 ,'seq' : 13 ,'latin' : 'quid dat? sæpe nihil dat.' ,'english' : 'what does he give? he often gives nothing.'}
    , { 'unit' : 1 ,'seq' : 14 ,'latin' : 'mē sæpe vocant et monent.' ,'english' : 'they often call me and advise me.'}
    , { 'unit' : 1 ,'seq' : 15 ,'latin' : 'nihil videō. quid vidēs?' ,'english' : 'I see nothing. what do you see?'}
    , { 'unit' : 1 ,'seq' : 16 ,'latin' : 'mē laudā sī nōn errō, amābō tē.' ,'english' : 'praise me, please, if I do not make a mistake.'}
    , { 'unit' : 1 ,'seq' : 17 ,'latin' : 'sī valētis, valēmus.' ,'english' : 'if you are well, we are well.'}
    , { 'unit' : 1 ,'seq' : 18 ,'latin' : 'sī valet, valeō.' ,'english' : 'if he is well, I am well.'}
    , { 'unit' : 1 ,'seq' : 19 ,'latin' : 'sī mē amat, dēbet mē laudāre.' ,'english' : 'if he(she) loves me, he(she) ought to praise me.'}
    , { 'unit' : 1 ,'seq' : 20 ,'latin' : 'cōnservāte mē.' ,'english' : 'save me.'}
    , { 'unit' : 1 ,'seq' : 21 ,'latin' : 'nōn dēbeō errāre.' ,'english' : 'I ought not to err.'}
    , { 'unit' : 1 ,'seq' : 22 ,'latin' : 'quid dēbēmus laudāre?' ,'english' : 'what ought we to praise?'}
    , { 'unit' : 1 ,'seq' : 23 ,'latin' : 'videt; cōgitat; monet.' ,'english' : 'he sees; he ponders; he advises.'}
    , { 'unit' : 2 ,'seq' : 9 ,'latin' : 'valē, patria mea.' ,'english' : 'goodbye, my native land.'}
    , { 'unit' : 2 ,'seq' : 10 ,'latin' : 'fortūna puellæ est magna.' ,'english' : 'the fortune of the girl is great.'}
    , { 'unit' : 2 ,'seq' : 11 ,'latin' : 'puella fortūnam patriæ tuæ laudat.' ,'english' : 'the girl is praising the fortune of your country.'}
    , { 'unit' : 2 ,'seq' : 12 ,'latin' : 'Ō puella, patriam tuam servā.' ,'english' : 'O girl, save your country.'}
    , { 'unit' : 2 ,'seq' : 13 ,'latin' : 'multæ puellæ pecūniam amant.' ,'english' : 'many girls love money.'}
    , { 'unit' : 2 ,'seq' : 14 ,'latin' : 'puellæ nihil datis.' ,'english' : 'you are giving nothing to the girl.'}
    , { 'unit' : 2 ,'seq' : 15 ,'latin' : 'pecūniam puellæ videt.' ,'english' : 'he sees the money of the girl.'}
    , { 'unit' : 2 ,'seq' : 16 ,'latin' : 'pecūniam puellārum nōn vidēs.' ,'english' : 'you do not see the girls\' money'}
    , { 'unit' : 2 ,'seq' : 17 ,'latin' : 'monēre puellās dēbēmus.' ,'english' : 'we ought to warn the girls.'}
    , { 'unit' : 2 ,'seq' : 18 ,'latin' : 'laudāre puellam dēbent.' ,'english' : 'they ought to praise the girl.'}
    , { 'unit' : 2 ,'seq' : 19 ,'latin' : 'vīta multīs puellīs fortūnam dat.' ,'english' : 'life gives fortune to many girls.'}
    , { 'unit' : 2 ,'seq' : 20 ,'latin' : 'vītam meam pecūniā tuā cōnservās.' ,'english' : 'you are saving my life by(with) your money.'}
    , { 'unit' : 2 ,'seq' : 21 ,'latin' : 'fāma est nihil sine fortūnā.' ,'english' : 'fame is nothing without fortune.'}
    , { 'unit' : 2 ,'seq' : 22 ,'latin' : 'vītam sine pecūniā nōn amātis.' ,'english' : 'you do not like life without money.'}
    , { 'unit' : 2 ,'seq' : 23 ,'latin' : 'sine fāmā et fortūnā patria nōn valet.' ,'english' : 'a country is not strong without fame and fortune.'}
    , { 'unit' : 2 ,'seq' : 24 ,'latin' : 'īram puellārum laudāre nōn dēbēs.' ,'english' : 'you ought not to praise the anger of the girls.'}
    , { 'unit' : 2 ,'seq' : 25 ,'latin' : 'vītam sine pœnīs amāmus.' ,'english' : 'we like a life without punishments.'}
    , { 'unit' : 2 ,'seq' : 26 ,'latin' : 'sine philosophiā nōn valēmus.' ,'english' : 'we are not strong without philosophy.'}
    , { 'unit' : 2 ,'seq' : 27 ,'latin' : 'quid est vīta sine philosophiā?' ,'english' : 'what is life without philosophy?'}
    , { 'unit' : 3 ,'seq' : 7 ,'latin' : 'Valē, mī amīce.' ,'english' : 'Good-bye, my friend.'}
    , { 'unit' : 3 ,'seq' : 8 ,'latin' : 'Populus Rōmānus sapientiam fīliī tuī laudat.' ,'english' : 'The Roman people praise your son\'s wisdom.'}
    , { 'unit' : 3 ,'seq' : 9 ,'latin' : 'Ō vir magne, populum Rōmānum servā.' ,'english' : 'O great man, save the Roman people.'}
    , { 'unit' : 3 ,'seq' : 10 ,'latin' : 'Numberus populī Rōmānī est magnus.' ,'english' : 'The number of the Roman people is great.'}
    , { 'unit' : 3 ,'seq' : 11 ,'latin' : 'Multī puerī puellās amant.' ,'english' : 'Many boys love girls.'}
    , { 'unit' : 3 ,'seq' : 12 ,'latin' : 'Fīliō meō nihil datis.' ,'english' : 'You are giving nothing to my son.'}
    , { 'unit' : 3 ,'seq' : 13 ,'latin' : 'Virōs in agrō videō' ,'english' : 'I see men in the field.'}
    , { 'unit' : 3 ,'seq' : 14 ,'latin' : 'Amīcum fīliī meī vidēs.' ,'english' : 'You see the friend of my son.'}
    , { 'unit' : 3 ,'seq' : 15 ,'latin' : 'Amīcum fīliōrum tuōrum nōn videt.' ,'english' : 'He does not see your sons\' friend.'}
    , { 'unit' : 3 ,'seq' : 16 ,'latin' : 'Dēbēmus fīliōs meōs monēre.' ,'english' : 'We ought to warn my sons.'}
    , { 'unit' : 3 ,'seq' : 17 ,'latin' : 'Dēbent fīlium tuum laudāre.' ,'english' : 'They ought to praise your son.'}
    , { 'unit' : 3 ,'seq' : 18 ,'latin' : 'Vīta paucīs virīs fāmam dat.' ,'english' : 'Life gives fame to few men.'}
    , { 'unit' : 3 ,'seq' : 19 ,'latin' : 'Mē in numerō amīcōrum toūrum habēs.' ,'english' : 'You consier me in the number of your friends.'}
    , { 'unit' : 3 ,'seq' : 20 ,'latin' : 'Virī magnī paucōs amīcōs sæpe habent.' ,'english' : 'Great men often have few friends.'}
    , { 'unit' : 3 ,'seq' : 21 ,'latin' : 'Amīcus meus semper cōgitat.' ,'english' : 'My friend is always thinking.'}
    , { 'unit' : 3 ,'seq' : 22 ,'latin' : 'Fīlius magnī virī nōn semper est magnus vir.' ,'english' : 'The son of a great man is not always a great man.'}
    , { 'unit' : 3 ,'seq' : 23 ,'latin' : 'Sapientiam magnōrum virōrum nōn semper vidēmus.' ,'english' : 'We do not always see the wisdom of great men.'}
    , { 'unit' : 3 ,'seq' : 24 ,'latin' : 'Philosophiam, sapientiam magnōrum virōrum, laudāre dēbētis.' ,'english' : 'You ought to praise philosophy, the wisdom of great men.'}
    , { 'unit' : 4 ,'seq' : 8 ,'latin' : 'Ōtium est bonum.' ,'english' : 'Peace is good.'}
    , { 'unit' : 4 ,'seq' : 9 ,'latin' : 'Multa bella ōtium nōn cōnservant.' ,'english' : 'Many wars do not preserve peace.'}
    , { 'unit' : 4 ,'seq' : 10 ,'latin' : 'Perīculum est magnum.' ,'english' : 'The danger is great.'}
    , { 'unit' : 4 ,'seq' : 11 ,'latin' : 'In magnō perīculō sumus.' ,'english' : 'We are in great danger.'}
    , { 'unit' : 4 ,'seq' : 12 ,'latin' : 'Et ōtium perīcula sæpe habet.' ,'english' : 'And leisure often has dangers.'}
    , { 'unit' : 4 ,'seq' : 13 ,'latin' : 'Vīta nōn est sine multīs perīculīs.' ,'english' : 'Life is not without many dangers.'}
    , { 'unit' : 4 ,'seq' : 14 ,'latin' : 'Bonī virī ōtium amant.' ,'english' : 'Good men love peace.'}
    , { 'unit' : 4 ,'seq' : 15 ,'latin' : 'Stultus vir perīcula bellī laudat.' ,'english' : 'The foolish man praises the dangers of war.'}
    , { 'unit' : 4 ,'seq' : 16 ,'latin' : 'Ōtium bellō sæpe nōn cōnservāmus.' ,'english' : 'Often we do not preserve the peace by war.'}
    , { 'unit' : 4 ,'seq' : 17 ,'latin' : 'Populus Rōmānus ōtium bonum nōn semper habet.' ,'english' : 'The Roman people do not always have good peace.'}
    , { 'unit' : 4 ,'seq' : 18 ,'latin' : 'Patriam et ōtium bellīs parvīs sæpe servant.' ,'english' : 'They often save the fatherland and peace by small wars.'}
    , { 'unit' : 4 ,'seq' : 19 ,'latin' : 'Multæ puellæ sunt bellæ.' ,'english' : 'Many girls are pretty.'}
    , { 'unit' : 4 ,'seq' : 20 ,'latin' : 'Vērī amīcī sunt paucī.' ,'english' : 'True friends are few.'}
    , { 'unit' : 4 ,'seq' : 21 ,'latin' : 'Amīcus meus est vir magnī officiī.' ,'english' : 'My friends is a man of great service.'}
    , { 'unit' : 4 ,'seq' : 22 ,'latin' : 'Officia magistrī sunt multa et magna.' ,'english' : 'The duties of a teacher are many and great.'}
    , { 'unit' : 4 ,'seq' : 23 ,'latin' : 'Vir parvī ōtiī es.' ,'english' : 'You are a man of little leisure.'}
    , { 'unit' : 4 ,'seq' : 24 ,'latin' : 'Virī magnæ cūræ estis.' ,'english' : 'You are men of great care.'}
    , { 'unit' : 4 ,'seq' : 25 ,'latin' : 'Sine morā cūram officiō dare dēbēmus.' ,'english' : 'We ought to give attention to duty without delay.'}
    , { 'unit' : 4 ,'seq' : 26 ,'latin' : 'Sine oculīs vīta est nihil.' ,'english' : 'Life is nothing without eyes.'}
    ];
  };

}])
;
