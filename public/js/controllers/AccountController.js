// public/js/controller/AccountController.js

angular.module('meanapp1').controller('AccountController',
    function ($scope, $routeParams, Usuario, $http, $location) {

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

        $scope.login = function(){

            console.log("....EMAIL: "+$scope.usuario.email+" SENHA: "+$scope.usuario.password);
            
            $http({
                method:"post",
                url:'/auth/local',
                data:{username: $scope.usuario.email, password: $scope.usuario.password},
            }).success(function(response){
                $scope.user = response;
                // $localStorage.userData = $scope.userData; 
                console.log("success!!");
                // $location.path("/profile")
                $location.path("/index")
            }).error(function(response){
                console.log("error!!");
                $location.path("/auth")
            });

        };

    });