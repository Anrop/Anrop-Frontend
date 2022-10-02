angular.module('operations').controller('AARSearchCtrl', function ($scope, $uibModalInstance, WebConfig, AARSvc) {
  $scope.aars = []
  $scope.loading = false

  $scope.aarUrl = function (aar) {
    return WebConfig.BASE_AAR_WEB + '/missions/' + aar.id
  }

  $scope.load = function (query) {
    $scope.aars = []
    $scope.loading = true
    AARSvc.missions().then(function (aars) {
      var operationDate = new Date($scope.operation.start)
      $scope.aars = aars.filter(function (aar) {
        var aarDate = new Date(aar.created_at)
        return (
          aarDate.getFullYear() === operationDate.getFullYear() &&
          aarDate.getMonth() === operationDate.getMonth() &&
          aarDate.getDate() === operationDate.getDate()
        )
      })
      $scope.loading = false
    })
  }

  $scope.close = function () {
    $uibModalInstance.dismiss('cancel')
  }

  $scope.load()
})
