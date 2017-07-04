// public/js/main.js

angular.module('meanapp1', ['ngRoute'])
    .config(function($routeProvider){

        $routeProvider.when('/lojas', {
            templateUrl: 'partials/lojas.html',
            controller: 'LojasController'
        });

        $routeProvider.when('loja/:lojaId', {
            templateUrl: 'partials/loja.html',
            controller: 'LojaController'
        });

    });