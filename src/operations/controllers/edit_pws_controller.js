angular.module('operations').controller('EditPwsCtrl', function ($scope, $uibModal, ApiConfig, PwsSvc) {
  $scope.form = {}

  $scope.add = function (data) {
    const found = $scope.addons.filter(function (addon) {
      return addon.name === data.name
    })

    if (found.length === 0) {
      return PwsSvc.add($scope.operationId, data).then(function () {
        loadAddons()
        $scope.form = {}
        return this
      })
    }
  }

  $scope.delete = function (addon) {
    PwsSvc.delete($scope.operationId, addon.id).then(function () {
      loadAddons()
      return this
    })
  }

  $scope.findMod = function (mod) {
    return $scope.addons.find(function (addon) {
      return addon.name === mod.name
    })
  }

  $scope.hasMod = function (mod) {
    return !!$scope.findMod(mod)
  }

  $scope.submit = function () {
    $scope.add($scope.form)
  }

  $scope.templates = function () {
    $uibModal.open({
      template: require('../templates/pws_templates.html'),
      controller: 'PwsTemplatesCtrl',
      scope: $scope
    }).result.then(function () {
      loadAddons()
    }, function () {

    })
  }

  $scope.arma3sync = function () {
    $uibModal.open({
      template: require('../templates/arma3sync_controller.html'),
      controller: 'Arma3SyncCtrl',
      scope: $scope
    }).result.then(function () {
      loadAddons()
    }, function () {

    })
  }

  $scope.dlcs = function () {
    $uibModal.open({
      template: require('../templates/pws_dlcs.html'),
      controller: 'PwsDlcsCtrl',
      scope: $scope
    }).result.then(function () {
      loadAddons()
    }, function () {

    })
  }

  $scope.suggestions = function () {
    $uibModal.open({
      template: require('../templates/arma3sync_suggestions_controller.html'),
      controller: 'Arma3SyncSuggestionsCtrl',
      scope: $scope
    }).result.then(function () {
      loadAddons()
    }, function () {

    })
  }

  const loadAddons = function () {
    PwsSvc.addons($scope.operationId).then(function (addons) {
      $scope.addons = addons
    })
  }

  loadAddons()
})
