// public/js/Controllers/ProdutosController.js

angular.module('meanapp1').controller('ProdutosController',
    function ($scope, Produto, Loja) {

        $scope.produtos = [];

        $scope.filtro = '';

        $scope.mensagem = { texto: '' };
        
        function buscaProdutos() {
            Produto.query(function (produtos) {
                $scope.produtos = produtos;
                $scope.mensagem = {};
            },
                function (erro) {
                    console.log(erro);
                    $scope.mensagem = { texto: "Não foi posível obter a lista de produtos" };
                }
            );

        };
        buscaProdutos();

        $scope.remove = function (produto) {
            Produto.delete({ id: produto._id },
                buscaProdutos, // callback de sucesso - recarrega a lista na view dpois da remoção
                function (erro) {   // callback de falha
                    console.log(erro);
                    $scope.mensagem = { texto: "Não foi posível remover o produto" };
                }
            );

        };

        Loja.query(function(lojas){
            $scope.lojas = lojas;
        });

    });