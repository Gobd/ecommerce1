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

    this.newUser = function(newUser){
        return $http({
            method: 'POST',
            url: 'http://localhost:8080/api/user',
            data: newUser
        });
    };

    this.login = function (email, password) {
        if (email && password) {
            return $http({
                method: 'GET',
                params: {email: email, password: password},
                url: 'http://localhost:8080/api/user'
            })
        } else {
            return $http({
                method: 'GET',
                url: 'http://localhost:8080/api/user'
            })
        }
    };

    this.addCart = function(data){
        return $http({
            method: 'POST',
            url: 'http://localhost:8080/api/cart/',
            data: data
        });
    };

    this.order = function(){
        return $http({
            method: 'POST',
            url: 'http://localhost:8080/api/order/'
        });
    };

    // post /api/cart/:id
// put /api/cart/:id

});