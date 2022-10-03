angular.module('operations').controller('Arma3SyncSuggestionsCtrl', function ($scope, $uibModalInstance, Arma3SyncSvc, SteamWorkshopSvc) {
  $scope.arma3syncMods = []
  $scope.mods = []
  $scope.steamWorkshopIds = []

  $scope.addAll = function () {
    $scope.mods.forEach(function (mod) {
      if (!$scope.hasMod(mod)) {
        $scope.add(mod)
      }
    })
  }

  $scope.close = function () {
    $uibModalInstance.dismiss('cancel')
  }

  const updateMods = function () {
    $scope.mods = $scope.arma3syncMods.filter(function (mod) {
      return mod.steamWorkshop && $scope.steamWorkshopIds.includes(mod.steamWorkshop.id)
    })
  }

  const loadArma3SyncMods = function () {
    Arma3SyncSvc.mods().then(function (mods) {
      $scope.arma3syncMods = mods
      updateMods()
    })
  }

  loadArma3SyncMods()

  const loadSteamWorkshopMods = function () {
    SteamWorkshopSvc.mods($scope.operationId).then(function (mods) {
      $scope.steamWorkshopIds = mods.map(function (mod) {
        return mod.steam_workshop_id
      })
      updateMods()
    })
  }

  loadSteamWorkshopMods()
})
