// public/js/services/LojaService.js

angular.module('meanapp1').factory('Loja', function($resource){
    return $resource('/lojas/:id');
});