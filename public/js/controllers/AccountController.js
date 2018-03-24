// public/js/controller/AccountController.js

angular.module('meanapp1').controller('AccountController',
    function ($scope, $routeParams, Usuario, getUsuario, $http, $location, $window) {

        $scope.mensagem = { texto: '' };

        if ($routeParams.usuarioId) {
            getUsuario.get({ id: $routeParams.usuarioId },
                function (getUsuario) {
                    $scope.usuario = getUsuario;
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
                console.log("success!!" + $scope.user.login);
                // $location.path("/profile")
                $location.path("/index");
                $window.location.reload();
            }).error(function(response){
                console.log("error!!");
                $location.path("/auth");
                $scope.mensagem = { texto: 'Falha no login, usuário ou senha inválidos' };
                $scope.alert = { type: 'alert alert-danger'};
            });

        };

    });