// public/js/services/UserService.js

angular.module('meanapp1').factory('Usuario', function($resource){
    return $resource('/auth/newAccount/');
});