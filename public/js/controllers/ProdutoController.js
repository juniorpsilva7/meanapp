// public/js/controller/ProdutoController.js

angular.module('meanapp1').controller('ProdutoController',
    function ($scope, $routeParams, $location, Produto, Loja, Upload) {

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
            if ($scope.produto_form.foto.$valid && $scope.produto.foto) {

                uploadFotoProduto($scope.produto.foto);

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

        // upload on file select or drop
        function uploadFotoProduto(file) {
            Upload.upload({
                url: 'http://localhost:3000/lojas/uploadFotoProduto',
                data: { file: file }
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