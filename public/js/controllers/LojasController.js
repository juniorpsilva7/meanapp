// public/js/Controllers/LojasController.js

angular.module('meanapp1').controller('LojasController',
    function ($scope, Loja, Produto, $http) {

        $scope.lojas = [];

        $scope.filtro = '';

        $scope.mensagem = { texto: '' };
        
        function buscaLojas() {
            Loja.query(function (lojas) {
                $scope.lojas = lojas;
                $scope.mensagem = {};
            },
                function (erro) {
                    console.log(erro);
                    $scope.mensagem = { texto: "Não foi posível obter a lista de lojas" };
                }
            );

        };
        buscaLojas();

        $scope.remove = function (loja) {
            Loja.delete({ id: loja._id },
                buscaLojas, // callback de sucesso - recarrega a lista na view dpois da remoção
                function (erro) {   // callback de falha
                    console.log(erro);
                    $scope.mensagem = { texto: "Não foi posível remover a loja" };
                }
            );
        };

        $scope.addProduto = function (loja){
            console.log(loja._id);
            $http.post('http://localhost:3000/#/produto',  { idLoja : loja._id });
        };

    });