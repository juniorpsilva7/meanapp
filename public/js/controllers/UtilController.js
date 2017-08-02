// public/js/Controllers/UtilController.js
angular.module('meanapp1')
  .controller('NavigationCtrl', ['$scope', '$location', function ($scope, $location) {
    $scope.isCurrentPath = function (path) {
      return $location.path() == path;
    };
  }]);