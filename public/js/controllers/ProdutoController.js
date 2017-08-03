// public/js/controller/ProdutoController.js

angular.module('meanapp1').controller('ProdutoController',
    function ($scope, $routeParams, Produto, Loja) {

        if ($routeParams.produtoId) {
            Produto.get({ id: $routeParams.produtoId },
                function (produto) {
                    $scope.produto = produto;
                },
                function (erro) {
                    $scope.mensagem = { texto: 'Não foi possível obter o produto' };
                    console.log(erro);
                }
            );

        } else {
            $scope.produto = new Produto();
            $scope.produto.prodLoja = $routeParams.lojaId;
        }

        $scope.salva = function(){
            $scope.produto.$save()
                .then(function(){
                    $scope.mensagem = {texto: 'Salvo com Sucesso'};
                    //limpa o formulário
                    $scope.produto = new Produto();
                })
                .catch(function(erro){
                    $scope.mensagem = {texto: 'Não foi possível salvar'};
                });
        };

        Loja.query(function(lojas){
            $scope.lojas = lojas;
        });

    });