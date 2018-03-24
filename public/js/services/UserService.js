// public/js/services/UserService.js

angular.module('meanapp1')
.factory('Usuario', function($resource){
    return $resource('/auth/newAccount/');
})
.factory('getUsuario', function($resource){
    return $resource('/auth/getUsuario/:id');
});