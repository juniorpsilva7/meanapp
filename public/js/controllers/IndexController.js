// public/js/Controllers/IndexController.js

angular.module('meanapp1').controller('IndexController',
function ($scope) {

    $scope.lojas = [];

    $scope.filtro = '';

    $scope.mensagem = { texto: 'teste msg' };    

});