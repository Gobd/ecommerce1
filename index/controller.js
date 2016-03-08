angular.module('app').controller('mainCtrl', function($scope, mainSvc, prodRef){

    $scope.products = prodRef;

    $scope.get = function(params, id){
        if (!params && !id) {
            return 'Please input search';
        }
       mainSvc.get(params, id).then(function(res){
           $scope.product = res.data;
       })
    };

});