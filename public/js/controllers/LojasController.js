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
            if (confirm('Tem certeza que deseja remover essa Loja?')) {
                Loja.delete({ id: loja._id },
                    buscaLojas, // callback de sucesso - recarrega a lista na view dpois da remoção
                    function (erro) {   // callback de falha
                        console.log(erro);
                        $scope.mensagem = { texto: "Não foi posível remover a loja" };
                    }
                );
            } else {
                //nada
            }
        };

    });