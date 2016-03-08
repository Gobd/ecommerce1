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
                }
            }
        })
        .state('admin', {
            url: "/admin",
            templateUrl: "partials/admin.html"
        });
});