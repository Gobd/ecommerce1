angular.module('app').controller('mainCtrl', function($scope, mainSvc, prodRef, userRef){

    $scope.products = prodRef;
    $scope.user = userRef;

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

    $scope.getUser = function(id){
    if(id) {
        mainSvc.login(id).then(function(res){
            $scope.user = res.data;
        })
    } else {
        mainSvc.login().then(function(res){
            $scope.user = res.data;
        })
    }
    };
});