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

    $scope.getUser = function(email, password){
    if(email && password) {
        mainSvc.login(email, password).then(function(res){
            console.log(res.data);
            $scope.user = res.data;
        })
    } else {
        mainSvc.login().then(function(res){
            console.log(res.data);
            $scope.user = res.data;
        })
    }
    };

    $scope.addCart = function(data){
        mainSvc.addCart(data).then(function(res){
            $scope.cart = res;
        })
    };

    $scope.order = function(){
        mainSvc.order().then(function(res){
            console.log(res);
            $scope.user = res.data;
        })
    }
});