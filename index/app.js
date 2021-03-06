angular.module('app', ['ui.router']);

angular.module('app').config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/main");

    $stateProvider
        .state('main', {
            url: "/main",
            templateUrl: "partials/main.html",
            controller: 'mainCtrl',
            resolve: {
                prodRef: function(mainSvc){
                    return mainSvc.index().then(function(res){
                        return res.data;
                    });
                },
                userRef: function(mainSvc){
                    return mainSvc.login().then(function(res){
                        return res.data;
                    });
                }

            }
        })
        .state('admin', {
            url: "/admin",
            templateUrl: "partials/admin.html",
            controller: 'adminCtrl',
            resolve: {
                prodRef: function(mainSvc){
                    return mainSvc.index().then(function(res){
                        return res.data;
                    });
                }
            }
        })
        .state('cart', {
            url: "/cart",
            templateUrl: "partials/cart.html",
            controller: 'mainCtrl',
            resolve: {
                prodRef: function(mainSvc){
                    return mainSvc.index().then(function(res){
                        return res.data;
                    });
                },
                userRef: function(mainSvc){
                    return mainSvc.login().then(function(res){
                        return res.data;
                    });
                }

            }
        });
});