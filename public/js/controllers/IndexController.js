// public/js/Controllers/IndexController.js

angular.module('meanapp1').controller('IndexController',
function ($scope, ProdutosIndex, $http ) {

    $scope.produtos = [];
    
    $scope.filtro = '';

    $scope.mensagem = { texto: '' };

    $scope.selecionaCidade = function() {
        var todasCidades = [];
        $scope.cidade = 'TESTE';
        // $scope.mensagem = {texto: 'Você selecionou a cidade ' +  $scope.cidade};
        var request = $http({
            method: 'GET',
            url: '/cidades'
          }).then(function successCallback(response) {
                $scope.mensagem = { texto: "Foi posível obter a lista de Cidades" };
                // console.log(response.data[0].cidades[0].nome_municipio);
                var dados = response.data;
                var UF;
                var nomeCidade;
                var arrayCidades;
                var objCidade = [];
                dados.forEach(element => {
                    UF = element.sigla_uf;
                    arrayCidades = element.cidades;

                    for(var j = 0; j < arrayCidades.length; j++){
                        objCidade = [];
                        objCidade.UF = UF;
                        objCidade.nomeCidade = arrayCidades[j].nome_municipio;
                        todasCidades.push(objCidade);
                    }
                });
                console.log(todasCidades);

            }, function errorCallback(response) {
                $scope.mensagem = { texto: "Não foi posível obter a lista de Cidades" };
            });
    };

    function buscaProdutosIndex() {
        ProdutosIndex.query(function (produtos) {
            $scope.produtos = produtos;
            $scope.mensagem = {texto: 'Produtos Carregados'};
        },
            function (erro) {
                console.log(erro);
                $scope.mensagem = { texto: "Não foi posível obter a lista de produtos" };
            }
        );

    };
    buscaProdutosIndex();

});