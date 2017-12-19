// public/js/Controllers/IndexController.js

angular.module('meanapp1').controller('IndexController',
function ($scope, ProdutosIndex, $http, $routeParams ) {

    $scope.produtos = [];
    
    $scope.filtro = '';

    $scope.mensagem = { texto: '' };

    function listaCidade() {
        var todasCidades = [];
        // $scope.mensagem = {texto: 'Você selecionou a cidade ' +  $scope.cidade};
        var request = $http({
            method: 'GET',
            url: '/cidades'
          }).then(function successCallback(response) {
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
                        objCidade.codigo = arrayCidades[j].codigo_ibge;
                        objCidade.UF = UF;
                        objCidade.nomeCidade = arrayCidades[j].nome_municipio;
                        todasCidades.push(objCidade);
                    }
                });
                $scope.todasCidades = todasCidades;
                // console.log(todasCidades);

            }, function errorCallback(response) {
                $scope.mensagem = { texto: "Não foi posível obter a lista de Cidades" };
            });
    };
    listaCidade();

    $scope.selecionaCidade = function (){
        // cidadeSelecionada = $routeParams.cidade.codigo;
        // console.log("Você escolheu "+ cidadeSelecionada);
        console.log($scope.cidade);
        buscaProdutosIndex();
    }

    function buscaProdutosIndex() {
        ProdutosIndex.query(function (produtos) {
            $scope.produtos = produtos;
            //$scope.mensagem = {texto: 'Produtos Carregados'};
        },
            function (erro) {
                console.log(erro);
                $scope.mensagem = { texto: "Não foi posível obter a lista de produtos" };
            }
        );

    };
    

});