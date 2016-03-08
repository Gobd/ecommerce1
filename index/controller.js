angular.module('app').controller('mainCtrl', function($scope, mainSvc, prodRef){

    $scope.products = prodRef;

    $scope.post = function(postData){
        mainSvc.post(postData);
    };

    $scope.get = function(params, id){
        if (!params && !id) {
            return 'Must input search';
        }
    if (params) {
        for (var key in params) {
            if (params[key].length < 1) {
                delete params[key];
            }
        }
    }
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