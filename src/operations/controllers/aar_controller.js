angular.module('operations').controller('AARCtrl', function ($scope, WebConfig, AARSvc) {
  $scope.aarUrl = function (aar) {
    return WebConfig.BASE_AAR_WEB + '/missions/' + aar.aar_id
  }

  $scope.load = function () {
    AARSvc.operation($scope.operationId).then(function (aars) {
      aars.forEach(function (aar) {
        AARSvc.mission(aar.aar_id).then(function (info) {
          Object.assign(aar, {
            length: info.length,
            name: info.name,
            world: info.world
          })
        })
      })

      $scope.aars = aars
    })
  }

  $scope.load()
})
