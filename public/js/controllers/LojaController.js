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

        $scope.salva = function(){
            if ($scope.loja_form.file.$valid && $scope.foto) { //check if from is valid
                upload($scope.foto); //call upload function
            }
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

        Loja.query(function(lojas){
            $scope.lojas = lojas;
        });

        function uploadFoto(file){
            Upload.upload({
                url: 'http://localhost:3000/upload', //webAPI exposed to upload the file
                data:{file:file} //pass file as data, should be user ng-model
            }).then(function (resp) { //upload function returns a promise
                if(resp.data.error_code === 0){ //validate success
                    $window.alert('Success ' + resp.config.data.file.name + 'uploaded. Response: ');
                } else {
                    $window.alert('an error occured');
                }
            }, function (resp) { //catch error
                console.log('Error status: ' + resp.status);
                $window.alert('Error status: ' + resp.status);
            }, function (evt) { 
                console.log(evt);
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                $scope.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
            });
        };

    });