angular.module('app', [])
  .controller('MainCtrl', function($scope) {
    $scope.submit = function() {
      $scope.results = [];
      $scope.DATA = convert($scope.srcData);
      $scope.TARGET_SUM = parseInt($scope.srcTarget.replace(/[\$\.,]/g, ''));
      var worker = new Worker("solver.js");
      worker.onmessage = function(event) {
        console.log(event.data);
        $scope.results.push(event.data);
        $scope.$apply();
      };
      var data = {
        DATA: $scope.DATA,
        TARGET_SUM: $scope.TARGET_SUM
      };
      worker.postMessage(JSON.stringify(data));
    }

  });
