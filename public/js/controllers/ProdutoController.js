// public/js/controller/ProdutoController.js

angular.module('meanapp1').controller('ProdutoController',
    function ($scope, $routeParams, $location, Produto, Loja) {

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
            $scope.produto.prodLoja = $routeParams.lojaId;
            getLoja($routeParams.lojaId);

        // se tentar acessar um novo produto sem passar uma loja como param   
        } else {
            alert('Não é possível adicionar produto sem loja');
            $location.path('/lojas');
        }

        //função para o submit do form
        $scope.salva = function () {
            $scope.produto.$save()
                .then(function () {
                    $scope.mensagem = { texto: 'Salvo com Sucesso' };
                    //limpa o formulário
                    $scope.produto = new Produto();
                    $scope.produto.prodLoja = $routeParams.lojaId;
                    //getLoja($routeParams.lojaId);
                })
                .catch(function (erro) {
                    $scope.mensagem = { texto: 'Não foi possível salvar' };
                });
        };

        //HELP FUNCTIONS
        function getLoja(idLoja) {
            Loja.get({ id: idLoja },
                function (loja) {
                    $scope.loja = loja;
                    console.log("dentro do getLoja");
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

    });