// public/js/services/ProdutosIndexService.js

angular.module('meanapp1').factory('ProdutosIndex', function($resource){
    return $resource('/produtosIndex/:id');
});