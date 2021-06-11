angular.module('operations').controller('EditAARCtrl', function ($scope, $uibModal, WebConfig, AARSvc, OperationSvc) {
  $scope.add = function (data) {
    var found = $scope.aars.filter(function (aar) {
      return aar.aar_id === data.id
    })

    if (found.length === 0) {
      return AARSvc.add($scope.operationId, { aar_id: data.id }).then(function () {
        loadAARs()
        return this
      })
    }
  }

  $scope.aarUrl = function (aar) {
    return WebConfig.BASE_AAR_WEB + '/missions/' + aar.aar_id
  }

  $scope.delete = function (aar) {
    AARSvc.delete($scope.operationId, aar.id).then(function () {
      loadAARs()
      return this
    })
  }

  $scope.search = function () {
    $uibModal.open({
      template: require('../templates/aar_search.html'),
      controller: 'AARSearchCtrl',
      scope: $scope
    }).result.then(function () {

    }, function () {

    })
  }

  var loadAARs = function () {
    OperationSvc.operation($scope.operationId).then(function (operation) {
      $scope.operation = operation
    })

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

  loadAARs()
})
