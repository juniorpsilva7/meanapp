// public/js/controller/ProdutoController.js

angular.module('meanapp1').controller('ProdutoController',
    function ($scope, $routeParams, $location, Produto, Loja, Upload, $timeout) {

        //modo edit do produto
        if ($routeParams.produtoId) {
            Produto.get({ id: $routeParams.produtoId },
                function (produto) {
                    $scope.produto = produto;
                    getLoja(produto.prodLoja);
                },
                function (erro) {
                    $scope.mensagem = { texto: 'Não foi possível obter o produto' };
                    console.log(erro);
                }
            );

            // modo adicionar novo produto em uma loja
        } else if ($routeParams.lojaId) {
            $scope.produto = new Produto();
            $scope.produto.preco = 0;
            $scope.produto.prodLoja = $routeParams.lojaId;
            getLoja($routeParams.lojaId);

            // se tentar acessar um novo produto sem passar uma loja como param   
        } else {
            alert('Não é possível adicionar produto sem loja');
            $location.path('/lojas');
        }

        //função para o submit do form
        $scope.salva = function () {
            if ($scope.produto_form.fotos.$valid && $scope.produto.fotos) {

                uploadFiles($scope.produto.fotos);

                $scope.produto.$save()
                    .then(function () {
                        $scope.mensagem = { texto: 'Salvo com Sucesso' };
                        //limpa o formulário
                        $scope.produto = new Produto();
                        $scope.produto.preco = 0;
                        $scope.produto.prodLoja = $routeParams.lojaId;
                    })
                    .catch(function (erro) {
                        $scope.mensagem = { texto: 'Não foi possível salvar' };
                    });

            } else {
                $scope.mensagem = { texto: 'Não foi possível salvar - Problemas com a Foto' };
            }
        };

        //HELP FUNCTIONS
        function getLoja(idLoja) {
            Loja.get({ id: idLoja },
                function (loja) {
                    $scope.loja = loja;
                },
                function (erro) {
                    $scope.mensagem = { texto: 'Não foi possível obter o nome da Loja' };
                    console.log(erro);
                }
            );
        }

        // Loja.query(function(lojas){
        //     $scope.lojas = lojas;
        // });

        // //Upload for multiple files
        // function uploadFiles(files){
        //     if(files && files.length){
        //         for (var i=0; i< files.length; i++){
        //             uploadFotoProduto(files[i]);
        //         }
        //     }
        // }

        // // upload on file select or drop
        // function uploadFotoProduto(file) {
        //     Upload.upload({
        //         url: 'http://localhost:3000/lojas/uploadFotoProduto',
        //         data: { file: file }
        //     }).then(function (resp) {
        //         console.log('Success ' + resp.config.data.file.name + ' uploaded. Response: ' + resp.data);
        //     }, function (resp) {
        //         console.log('Error status: ' + resp.status);
        //     }, function (evt) {
        //         var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        //         console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        //     });
        // }

        function uploadFiles(files){
            $scope.files = files;
            if (files && files.length) {
                Upload.upload({
                    url: '/produtos/uploadFotoProduto',
                    arrayKey: '', // default is '[i]'
                    data: {
                        files: files
                    }
                }).then(function (resp) {
                    $timeout(function () {
                        $scope.result = resp.data;
                        console.log('Success ' + resp.config.data.files.length + ' uploaded. Response: ' + resp.data);
                    });
                }, function (resp) {
                    if (resp.status > 0) {
                        console.log('Error status: ' + resp.status);
                        $scope.errorMsg = resp.status + ': ' + resp.data;
                    }
                }, function (evt) {
                    $scope.progress = 
                        Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                        console.log('progress: ' + progressPercentage + '% ');
                });
            }
        }

    });