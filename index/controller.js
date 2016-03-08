angular.module('app').controller('mainCtrl', function($scope, mainSvc, prodRef){

    $scope.products = prodRef;

    $scope.get = function(params){
       mainSvc.get(params).then(function(res){
           $scope.products = res.data;
       })
    };
});