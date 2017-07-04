// public/js/Controllers/LojasController.js

angular.module('meanapp1').controller('LojasController', 
    function($scope){
        $scope.total = 0;

        $scope.incrementa = function(){
            $scope.total++;
        }
        
});