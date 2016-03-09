angular.module('app').service('mainSvc', function($http){

    this.post = function(data){
       return $http({
            method: 'POST',
            url: 'http://localhost:8080/products/',
            data: data
        })
    };

    this.index = function(){
        return $http({
            method: 'GET',
            url: 'http://localhost:8080/products'
        });
    };

    this.get = function(params, id){
        if (id) {
            return $http({
                method: 'GET',
                url: 'http://localhost:8080/products/' + id
            });
        }
            return $http({
                method: 'GET',
                url: 'http://localhost:8080/products',
                params: params
            });
    };

    this.put = function(product){
        id = product._id;
        delete product._id;
        $http({
            method: 'PUT',
            url: 'http://localhost:8080/products/' + id,
            data: product
        }).then(function successCallback(response) {
            return response;
        }, function errorCallback(response) {
            return response;
        });
    };

    this.delete = function(id){
        $http({
            method: 'DELETE',
            url: 'http://localhost:8080/products/' + id
        }).then(function successCallback(response) {
            return response;
        }, function errorCallback(response) {
            return response;
        });
    };

});