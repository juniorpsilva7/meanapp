// public/js/main.js

angular.module('meanapp1', ['ngRoute', 'ngResource'])
    .config(function($routeProvider){

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

        $routeProvider.otherwise({redirectTo: '/lojas'}); // rota alternativa caso não encontre a digitada

    });