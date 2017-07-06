// public/js/controller/LojaControlle.js

angular.module('meanapp1').controller('LojaController',
    function ($scope, $routeParams, Loja) {

        if ($routeParams.lojaId) {
            Loja.get({ id: $routeParams.lojaId },
                function (loja) {
                    $scope.loja = loja;
                },
                function (erro) {
                    $scope.mensagem = { texto: 'Não foi possível obter a loja' };
                    console.log(erro);
                }
            );

        } else {
            $scope.loja = new Loja();
        }

        $scope.salva = function(){
            $scope.loja.$save()
                .then(function(){
                    $scope.mensagem = {texto: 'Salvo com Sucesso'};
                    //limpa o formulário
                    $scope.loja = new Loja();
                })
                .catch(function(erro){
                    $scope.mensagem = {texto: 'Não foi possível salvar'};
                });
        };

    });