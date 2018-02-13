// public/js/controller/AccountController.js

angular.module('meanapp1').controller('AccountController',
    function ($scope, $routeParams, Usuario, $http) {

        $scope.mensagem = { texto: '' };

        if ($routeParams.userId) {
            Usuario.get({ id: $routeParams.userId },
                function (usuario) {
                    $scope.usuario = usuario;
                },
                function (erro) {
                    $scope.mensagem = { texto: 'Não foi possível obter o usuario.' };
                    console.log(erro);
                }
            );

        } else {
            $scope.usuario = new Usuario();
        }

        $scope.salva = function () {

            $scope.usuario.$save()
            .then(function () {
                $scope.mensagem = { texto: 'Salvo com Sucesso' };
                //limpa o formulário
                $scope.usuario = new Usuario();
            })
            .catch(function (erro) {
                $scope.mensagem = { texto: 'Não foi possível salvar' };
            });
            
        };

    });