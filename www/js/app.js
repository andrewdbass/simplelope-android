angular.module('simplelope', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {

      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.controller('AppController', function($scope, $ionicPopup){
  $scope.expense = {}
  $scope.envelopes = []
  $scope.showExpenseForm = false
  $scope.toggleExpenseForm = function(){
    $scope.showExpenseForm = !$scope.showExpenseForm
  }
  $scope.newEnvelope = function() {
    $scope.data = {}
    $ionicPopup.show({
      template: '<input type = "text" ng-model = "data.name" placeholder = "name"/></br><input type = "number" ng-model = "data.amount" placeholder = "ammount"/>',
      title: 'Create Envelope',
      scope: $scope,
      buttons: [{
         text: 'Cancel'
      }, {
         text: '<b>Save</b>',
         type: 'button-positive',
         onTap: function(e) {
          return $scope.data
         }
      },]
   }).then(function(res) {
      if(res) $scope.envelopes.push(res)
    })
  }
  
  $scope.makeExpense = function(env){
    if(env.amount - $scope.expense.amount >=0){
      env.amount -=$scope.expense.amount
      $scope.expense.amount = null
      $scope.showExpenseForm = false
    }
    else{
      $ionicPopup.alert({
        title: 'Hey!',
        template: 'You dont have enough in this envelope!</br>Split the expense up please :(',
        okText: 'OK',
      })
    }
  }
})