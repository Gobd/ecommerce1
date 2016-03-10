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

    $scope.getUser = function(id){
    if(id) {
        console.log('yesif')
        mainSvc.login(id).then(function(res){
            $scope.user = res.data;
        })
    } else {
        console.log('noif')
        mainSvc.login().then(function(res){
            $scope.user = res.data;
        })
    }
    };

    $scope.getUser(0);
});