angular.module('app').controller('mainCtrl', function($scope, mainSvc, prodRef){

    $scope.products = prodRef;

    $scope.get = function(params){
       mainSvc.get(params).then(function(res){
           $scope.products = res.data;
       })
    };

    $scope.newUser = function(userData){
        mainSvc.newUser(userData).then(function(res){
            $scope.user = res.data;
        })
    };

    $scope.getUser = function(){
        mainSvc.login().then(function(res){
            $scope.user2 = res.data;
        })
    };
});