// public/js/Controllers/IndexController.js

angular.module('meanapp1').controller('IndexController',
function ($scope, ProdutosIndex) {

    $scope.produtos = [];
    
    $scope.filtro = '';

    $scope.mensagem = { texto: '' };

    function buscaProdutosIndex() {
        ProdutosIndex.query(function (produtos) {
            $scope.produtos = produtos;
            $scope.mensagem = {};
        },
            function (erro) {
                console.log(erro);
                $scope.mensagem = { texto: "Não foi posível obter a lista de produtos" };
            }
        );

    };
    buscaProdutosIndex();

});