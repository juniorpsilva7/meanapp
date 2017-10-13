// public/js/controller/LojaControlle.js

angular.module('meanapp1').controller('LojaController',
    function ($scope, $routeParams, Loja, Upload, $window) {

        if ($routeParams.lojaId) {
            Loja.get({ id: $routeParams.lojaId },
                function (loja) {
                    $scope.loja = loja;
                },
                function (erro) {
                    $scope.mensagem = { texto: 'Não foi possível obter a loja.' };
                    console.log(erro);
                }
            );

        } else {
            $scope.loja = new Loja();
        }

        $scope.salva = function () {
            if ($scope.loja_form.foto.$valid && $scope.loja.foto) {

                uploadFotoLoja($scope.loja.foto);

                $scope.loja.$save()
                .then(function () {
                    $scope.mensagem = { texto: 'Salvo com Sucesso' };
                    //limpa o formulário
                    $scope.loja = new Loja();
                })
                .catch(function (erro) {
                    $scope.mensagem = { texto: 'Não foi possível salvar' };
                });
            } else {
                $scope.mensagem = { texto: 'Não foi possível salvar - Problemas com a Foto' };
            }
            
        };

        Loja.query(function (lojas) {
            $scope.lojas = lojas;
        });

        // upload on file select or drop
        function uploadFotoLoja (file) {
            Upload.upload({
                url: 'http://localhost:3000/lojas/uploadFotoLoja',
                data: { file: file}
            }).then(function (resp) {
                console.log('Success ' + resp.config.data.file.name + ' uploaded. Response: ' + resp.data);
            }, function (resp) {
                console.log('Error status: ' + resp.status);
            }, function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            });
        }

    });