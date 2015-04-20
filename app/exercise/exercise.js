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
    , { 'unit' : 5 ,'seq' : 9 ,'latin' : 'Magister noster mē laudat et tē crās laudābit.' ,'english' : 'Our teacher praises me and he will praise you tomorrow.'}
    , { 'unit' : 5 ,'seq' : 10 ,'latin' : 'Līberī virī perīcula nostra superābant.' ,'english' : 'Free men were overcoming our dangers.'}
    , { 'unit' : 5 ,'seq' : 11 ,'latin' : 'Fīliī nostrī puellās pulchrās amant.' ,'english' : 'Our sons love pretty girls.'}
    , { 'unit' : 5 ,'seq' : 12 ,'latin' : 'Amīcus noster in numerō stultōrum nōn remanēbit.' ,'english' : 'Our friend will not stay in the company of fools.'}
    , { 'unit' : 5 ,'seq' : 13 ,'latin' : 'Culpās multās habēbāmus et semper habēbimus.' ,'english' : 'We used to have many faults and always shall have.'}
    , { 'unit' : 5 ,'seq' : 14 ,'latin' : 'Perīcula magna animōs nostrōs nōn superant.' ,'english' : 'Great dangers do not overcome our courage.'}
    , { 'unit' : 5 ,'seq' : 15 ,'latin' : 'Pulchra patria nostra est lībera.' ,'english' : 'Our beautiful country is free.'}
    , { 'unit' : 5 ,'seq' : 16 ,'latin' : 'Līberī virī estis; patriam pulchram habēbitis.' ,'english' : 'You are free men; you will have a beautiful country.'}
    , { 'unit' : 5 ,'seq' : 17 ,'latin' : 'Magistrī līberī officiō cūram dabant.' ,'english' : 'Free teachers were giving attention to duty.'}
    , { 'unit' : 5 ,'seq' : 18 ,'latin' : 'Malōs igitur in patriā nostrā superābimus.' ,'english' : 'Therefore, we shall overcome evil men in our country.'}
    , { 'unit' : 5 ,'seq' : 19 ,'latin' : 'Sī īram tuam superābis, tē superābis.' ,'english' : 'If you overcome your anger, you will overcome your self.'}
    , { 'unit' : 5 ,'seq' : 20 ,'latin' : 'Propter nostrōs animōs multī sunt līberī.' ,'english' : 'Because of our courage many men are free.'}
    , { 'unit' : 5 ,'seq' : 21 ,'latin' : 'Tē, Ō patria lībera, semper amābāmus et semper amābimus.' ,'english' : 'Free fatherland, we always used to love you and we always shall love.'}
    , { 'unit' : 5 ,'seq' : 22 ,'latin' : 'Sapientiam pecūniā nōn cōnservābitis.' ,'english' : 'You will not preserve wisdom by means of money.'}
    , { 'unit' : 5 ,'seq' : 23 ,'latin' : 'Habetne animus tuus satis sapientiæ?' ,'english' : 'Dœs your soul possess enough wisdom?'}
    , { 'unit' : 6 ,'seq' : 6 ,'latin' : 'Patria vestra erat lībera.' ,'english' : 'Your country was free.'}
    , { 'unit' : 6 ,'seq' : 7 ,'latin' : 'Poteram esse tyrannus.' ,'english' : 'I was able to be a tyrant.'}
    , { 'unit' : 6 ,'seq' : 8 ,'latin' : 'Amīcus vester erit tyrannus.' ,'english' : 'Your friend will be a tyrant.'}
    , { 'unit' : 6 ,'seq' : 9 ,'latin' : 'Ubi tyrannus est, ibi virī nōn possunt esse līberī.' ,'english' : 'Where is a tyrant, there men cannot be free.'}
    , { 'unit' : 6 ,'seq' : 10 ,'latin' : 'In patriā nostrā heri nōn poterat remanēre.' ,'english' : 'He could not remain in our country yesterday.'}
    , { 'unit' : 6 ,'seq' : 11 ,'latin' : 'Tyrannī multa vitia semper habēbunt.' ,'english' : 'Tyrants will always have many faults.'}
    , { 'unit' : 6 ,'seq' : 12 ,'latin' : 'Tyrannōs superāre nōn poterāmus.' ,'english' : 'We were not able to overcome the tyrants.'}
    , { 'unit' : 6 ,'seq' : 13 ,'latin' : 'Tyrannum nostrum superāre dēbēmus.' ,'english' : 'We ought to overcome our tyrant.'}
    , { 'unit' : 6 ,'seq' : 14 ,'latin' : 'Tyrannus bonōs superāre poterat; sed ibi remanēre nōn poterit.' ,'english' : 'The tyrant was able to overcome good men; but he will not be able to remain there.'}
    , { 'unit' : 6 ,'seq' : 15 ,'latin' : 'Poteritis perīcula tyrannī vidēre.' ,'english' : 'You will be able to see the dangers of a tyrant.'}
    , { 'unit' : 6 ,'seq' : 16 ,'latin' : 'Vitia tyrannōrum tolerāre nōn possumus.' ,'english' : 'We cannot tolerate the faults of tyrants.'}
    , { 'unit' : 6 ,'seq' : 17 ,'latin' : 'Īnsidiās tyrannī nōn tolerābās.' ,'english' : 'You were not tolerating the treachery of the tyrant.'}
    , { 'unit' : 6 ,'seq' : 18 ,'latin' : 'Ōtium in patriā vestrā nōn potest esse perpetuum.' ,'english' : 'The peace in your country cannot be perpetual.'}
    , { 'unit' : 6 ,'seq' : 19 ,'latin' : 'Dēbēs virōs līberōs dē tyrannīs monēre.' ,'english' : 'You ought to warn free men about tyrants.'}
    , { 'unit' : 6 ,'seq' : 20 ,'latin' : 'Magister vester librōs pulchrōs semper amābat.' ,'english' : 'Your teacher always used to like fine books.'}
    , { 'unit' : 6 ,'seq' : 21 ,'latin' : 'Librī bonī vērīque poterant patriam cōnservāre.' ,'english' : 'Good and true books were able to save the country.'}
    , { 'unit' : 6 ,'seq' : 22 ,'latin' : 'Librīs bonīs patriam vestram cōnservāre poteritis.' ,'english' : 'You will be able to save your country with good books.'}
    , { 'unit' : 6 ,'seq' : 23 ,'latin' : 'Tyrannī sapientiam bonōrum librōrum superāre nōn poterunt.' ,'english' : 'Tyrants will not be able to overcome the wisdom of good books.'}
    , { 'unit' : 6 ,'seq' : 24 ,'latin' : 'Malī librōs bonōs nōn possunt tolerāre.' ,'english' : 'Bad men cannot tolerate good books.'}
    ];
  };

}])
;
