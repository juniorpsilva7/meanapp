// public/js/services/Produtoervice.js

angular.module('meanapp1').factory('Produto', function($resource){
    return $resource('/produtos/:id');
});