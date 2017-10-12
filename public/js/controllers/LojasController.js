// public/js/Controllers/LojasController.js

angular.module('meanapp1').controller('LojasController',
    function ($scope, Loja, Produto, $http, $q) {

        $scope.lojas = [];
        var produtosLojaDelete = []; //var que contera a lista de produtos da loja que sera deletada

        $scope.filtro = '';

        $scope.mensagem = { texto: '' };

        function buscaLojas() {
            Loja.query(function (lojas) {
                $scope.lojas = lojas;
                $scope.mensagem = {};
            },
                function (erro) {
                    console.log(erro);
                    $scope.mensagem = { texto: "Não foi posível obter a lista de lojas" };
                }
            );

        };
        buscaLojas();

        $scope.remove = function (loja) {
            if (confirm('Tem certeza que deseja remover essa Loja?')) {
                $q.all([
                    queryProdutos()
                ]).then(function (data) {
                    var produtosResource = data[0];
                    var lojaHasProd;
                    angular.forEach(produtosResource, function (prod, index) {
                        if (prod.prodLoja._id == loja._id) {
                            produtosLojaDelete[produtosLojaDelete.length] = prod._id;
                        }
                    });

                    if (produtosLojaDelete.length > 0) {
                        lojaHasProd = true; // se tem produtos
                    } else {
                        lojaHasProd = false; // se nao tem produtos
                    }

                    if (lojaHasProd) { // se a loja tiver produtos cadastrados
                        if (confirm('Essa Loja possui produtos cadastrados\nDeseja remover também todos os produtos cadastrados?')) {
                            // apagar cada produto dessa loja
                            angular.forEach(produtosLojaDelete, function (prod, index) {
                                console.log('Deletar produto: ' + produtosLojaDelete[index]);
                                Produto.delete({ id: produtosLojaDelete[index] },
                                    buscaLojas, // callback de sucesso - recarrega a lista na view dpois da remoção
                                    function (erro) {   // callback de falha
                                        console.log(erro);
                                        $scope.mensagem = { texto: "Não foi posível remover o produto" };
                                    }
                                );
                            });

                            Loja.delete({ id: loja._id },
                                buscaLojas, // callback de sucesso - recarrega a lista na view dpois da remoção
                                function (erro) {   // callback de falha
                                    console.log(erro);
                                    $scope.mensagem = { texto: "Não foi posível remover a loja" };
                                }
                            );
                            console.log('apagou 1 - LOJA');
                            produtosLojaDelete.length = 0;
                        }
                    } else { // se a loja nao tiver produtos
                        Loja.delete({ id: loja._id },
                            buscaLojas, // callback de sucesso - recarrega a lista na view dpois da remoção
                            function (erro) {   // callback de falha
                                console.log(erro);
                                $scope.mensagem = { texto: "Não foi posível remover a loja" };
                            }
                        );
                        console.log('faz de conta que apagou 2 - LOJA');
                        produtosLojaDelete.length = 0;
                    }
                });
                // var lojaHasProd = lojaHasProdValidation(loja._id);
                // if(lojaHasProd){ // se tiver produtos apagar cascade
                //     if (confirm('Essa Loja possui produtos cadastrados\nDeseja remover também todos os produtos cadastrados?')) {

                //         // Loja.delete({ id: loja._id },
                //         //     buscaLojas, // callback de sucesso - recarrega a lista na view dpois da remoção
                //         //     function (erro) {   // callback de falha
                //         //         console.log(erro);
                //         //         $scope.mensagem = { texto: "Não foi posível remover a loja" };
                //         //     }
                //         // );
                //         console.log('faz de conta que apagou 1');

                //     }
                // } else { //Se nao tiver produtos deleta normal

                //     // Loja.delete({ id: loja._id },
                //     //     buscaLojas, // callback de sucesso - recarrega a lista na view dpois da remoção
                //     //     function (erro) {   // callback de falha
                //     //         console.log(erro);
                //     //         $scope.mensagem = { texto: "Não foi posível remover a loja" };
                //     //     }
                //     // );
                //     console.log('faz de conta que apagou 2');

                // }

            } else {
                //nada
            }
        };

        function queryProdutos() {
            var d = $q.defer();
            var result = Produto.query(function () {
                d.resolve(result);
            });
            return d.promise;
        }

    });