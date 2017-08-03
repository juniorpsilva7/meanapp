// public/js/Controllers/UtilController.js

// CONTROLLER PARA DISPONIBILIZAR FUNCTION NO $scope

angular.module('meanapp1')
  .controller('UtilController', ['$scope', '$location', function ($scope, $location) {

    // Function isCurrentPath
    $scope.isCurrentPath = function (path) {
      return $location.path() == path;
    };

  }]);