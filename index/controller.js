angular.module('app').controller('mainCtrl', function($scope, mainSvc, prodRef){

    $scope.products = prodRef;

    $scope.post = function(postData){
        mainSvc.post(postData);
    };

    $scope.get = function(params, id){
       mainSvc.get(params, id).then(function(res){
           $scope.product = res.data;
       })
    };

    $scope.put = function(putData, id){
        mainSvc.put(putData, id);
    };

    $scope.delete = function(delId) {
        mainSvc.delete(delId);
    };
    
});