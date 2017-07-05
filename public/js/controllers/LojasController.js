// public/js/Controllers/LojasController.js

angular.module('meanapp1').controller('LojasController',
    function ($scope, $resource) {

        $scope.lojas = [];

        $scope.filtro = '';
        
        $scope.mesagem = {texto: ''};

        var Loja = $resource('/lojas/:id');

        function buscaLojas() {
            Loja.query(function (lojas) {
                $scope.lojas = lojas;
                $scope.mesagem = {};
            },
                function (erro) {
                    console.log(erro);
                    $scope.mesagem = {texto: "Não foi posível obter a lista de lojas"};
                }
            );

        };
        buscaLojas();

        $scope.remove = function (loja) {
            Loja.delete({ id: loja._id },
                buscaLojas, // callback de sucesso - recarrega a lista na view dpois da remoção
                function (erro) {   // callback de falha
                    console.log(erro);
                    $scope.mesagem = { texto: "Não foi posível remover a loja"};
                }
            );

        };

    });