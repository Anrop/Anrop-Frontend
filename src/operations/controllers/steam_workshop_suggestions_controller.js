angular.module('operations').controller('SteamWorkshopSuggestionsCtrl', function ($q, $scope, $uibModalInstance, Arma3SyncSvc, PwsSvc, SteamWorkshopSvc) {
  $scope.query = ''
  $scope.loading = false
  $scope.mods = []
  $scope.operationMods = []
  $scope.repoMods = []

  const loadArma3SyncMods = function () {
    $scope.loading = true
    PwsSvc.addons($scope.operationId).then(function (addons) {
      $scope.operationMods = addons

      if (!$scope.operationMods) {
        $scope.loading = false
        return
      }

      loadArma3SyncRepository()
    })
  }

  loadArma3SyncMods()

  const loadArma3SyncRepository = function () {
    Arma3SyncSvc.mods($scope.operationId).then(function (mods) {
      $scope.repoMods = mods
      $scope.updateMods()
    })
  }

  $scope.addAll = function () {
    $scope.mods.forEach(function (mod) {
      if (!$scope.hasMod(mod)) {
        $scope.add(mod)
      }
    })
  }

  $scope.updateMods = function () {
    $scope.mods = $scope.repoMods.filter(function (repoMod) {
      return repoMod.name && repoMod.steamWorkshop && repoMod.steamWorkshop.id && $scope.operationMods.find(function (operationMod) {
        return operationMod.name === repoMod.name
      })
    }).map(function (repoMod) {
      return {
        id: repoMod.steamWorkshop.id,
        name: repoMod.steamWorkshop.name || repoMod.name
      }
    })
    $scope.loading = false
  }

  $scope.close = function () {
    $uibModalInstance.dismiss('cancel')
  }
})
