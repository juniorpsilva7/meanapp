// public/js/main.js

angular.module('meanapp1', ['ngRoute', 'ngResource'])
    .config(function($routeProvider, $httpProvider){

        $httpProvider.interceptors.push('meuInterceptor');

        $routeProvider.when('/lojas', {
            templateUrl: 'partials/lojas.html',
            controller: 'LojasController'
        });

        $routeProvider.when('/loja/:lojaId', {
            templateUrl: 'partials/loja.html',
            controller: 'LojaController'
        });

        $routeProvider.when('/loja', {
            templateUrl: 'partials/loja.html',
            controller: 'LojaController'
        });

        $routeProvider.when('/auth', {
            templateUrl: 'partials/auth.html'
        });

        $routeProvider.otherwise({redirectTo: '/index'}); // rota alternativa caso não encontre a digitada

    });