// public/js/Controllers/LojasController.js

angular.module('meanapp1').controller('LojasController',
    function ($scope, Loja, Produto, $http) {

        $scope.lojas = [];
        $scope.produtosLojaDelete = []; //var que contera a lista de produtos da loja que sera deletada

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
                if(lojaHasProdValidation(loja._id)){ // se tiver produtos apagar cascade
                    if (confirm('Essa Loja possui produtos cadastrados\nDeseja remover também todos os produtos cadastrados?')) {

                        // Loja.delete({ id: loja._id },
                        //     buscaLojas, // callback de sucesso - recarrega a lista na view dpois da remoção
                        //     function (erro) {   // callback de falha
                        //         console.log(erro);
                        //         $scope.mensagem = { texto: "Não foi posível remover a loja" };
                        //     }
                        // );
                        console.log('faz de conta que apagou 1');

                    }
                } else { //Se nao tiver produtos deleta normal
                    
                    // Loja.delete({ id: loja._id },
                    //     buscaLojas, // callback de sucesso - recarrega a lista na view dpois da remoção
                    //     function (erro) {   // callback de falha
                    //         console.log(erro);
                    //         $scope.mensagem = { texto: "Não foi posível remover a loja" };
                    //     }
                    // );
                    console.log('faz de conta que apagou 2');

                }

            } else {
                //nada
            }
        };

        //HELP FUNCTION
        function lojaHasProdValidation(idLoja){
            console.log(idLoja);
            Produto.query(function (produtos) {
                angular.forEach(produtos, function (prod, index) {
                    if(prod.prodLoja._id == idLoja ){
                        console.log(prod.prodLoja._id + ' ' + index);
                        $scope.produtosLojaDelete[index] = prod._id;
                    }
                });

                if($scope.produtosLojaDelete.length > 0){
                    console.log('true');
                    console.log($scope.produtosLojaDelete);
                    return true;
                } else{
                    console.log('false');
                    console.log($scope.produtosLojaDelete);
                    return false;
                }
            });
            
        }

    });