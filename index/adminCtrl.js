angular.module('app').controller('adminCtrl', function($scope, mainSvc, prodRef){

    $scope.products = prodRef;

    $scope.post = function(postData){
        mainSvc.post(postData).then(function(response){
            $scope.products.push(response.data);
        })
        $scope.postData = {};
    };

    $scope.get = function(params, id){
        if (!params && !id) {
            return 'Please input search';
        }
        mainSvc.get(params, id).then(function(res){
            $scope.products = res.data;
        })
    };

    $scope.put = function(product){
        mainSvc.put(product);
        $scope.activeItem = '';
    };

    $scope.delete = function(delId) {
        mainSvc.delete(delId);
    };

    $scope.setActive=function(product) {
        $scope.activeItem = product;
        $scope.original = angular.copy(product);
    };

    $scope.setCancel=function(product) {
        var index = $scope.products.map(function(e) { return e._id; }).indexOf(product._id);
        $scope.activeItem = '';
        $scope.products[index] = $scope.original;
    };

});