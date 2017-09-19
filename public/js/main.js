// public/js/main.js

angular.module('meanapp1', ['ngRoute', 'ngResource', 'ngFileUpload'])
    .config(function ($routeProvider, $httpProvider) {

        $httpProvider.interceptors.push('meuInterceptor');
        // routeProvider LOJA
        $routeProvider.when('/lojas', {
            templateUrl: 'partials/loja/lojas.html',
            controller: 'LojasController'
        });

        $routeProvider.when('/loja/:lojaId', {
            templateUrl: 'partials/loja/loja.html',
            controller: 'LojaController'
        });

        $routeProvider.when('/loja', {
            templateUrl: 'partials/loja/loja.html',
            controller: 'LojaController'
        });

        // routeProvider PRODUTO
        $routeProvider.when('/produtos', {
            templateUrl: 'partials/produto/produtos.html',
            controller: 'ProdutosController'
        });

        $routeProvider.when('/produto/:produtoId', {
            templateUrl: 'partials/produto/produto.html',
            controller: 'ProdutoController'
        });

        $routeProvider.when('/produto', {
            templateUrl: 'partials/produto/produto.html',
            controller: 'ProdutoController'
        });

        $routeProvider.when('/produto/loja/:lojaId', {
            templateUrl: 'partials/produto/produto.html',
            controller: 'ProdutoController'
        });

        // routeProvider AUTH
        $routeProvider.when('/auth', {
            templateUrl: 'partials/auth.html'
        });

        // rota alternativa caso não encontre a digitada
        $routeProvider.otherwise({ redirectTo: '/index' });

    });