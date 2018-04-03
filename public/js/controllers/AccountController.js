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

            //dá um get se o usuário existe, se sim dá o erro
            $http({
                method:"get",
                url:'/auth/userExist/' + $scope.usuario.email,
            }).success(function(response){
                console.log("success!!");

                $scope.usuario.$save()
                    .then(function () {
                        $scope.mensagem = { texto: 'Salvo com Sucesso' };
                        $scope.alert = { type: 'alert alert-success'};
                        //limpa o formulário
                        $scope.usuario = new Usuario();
                    })
                    .catch(function (erro) {
                        $scope.mensagem = { texto: 'Não foi possível salvar' };
                        $scope.alert = { type: 'alert alert-danger'};
                    });

            }).error(function(response){
                console.log("error!!");
                $scope.mensagem = { texto: 'Email de usuário já existente' };
                $scope.alert = { type: 'alert alert-danger'};
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