angular.module('operations').controller('Arma3SyncSuggestionsCtrl', function ($scope, $uibModalInstance, Arma3SyncSvc, SteamWorkshopSvc) {
  $scope.arma3syncMods = []
  $scope.loading = true
  $scope.loadingArma3Sync = true
  $scope.loadingSteamWorkshop = true
  $scope.missingSteamWorkshopIds = []
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
    $scope.missingSteamWorkshopIds = $scope.steamWorkshopIds.filter(function (steamWorkshopId) {
      return !$scope.arma3syncMods.find(function (mod) {
        return mod.steamWorkshop && mod.steamWorkshop.id === steamWorkshopId
      })
    })
    $scope.mods = $scope.arma3syncMods.filter(function (mod) {
      return mod.steamWorkshop && $scope.steamWorkshopIds.includes(mod.steamWorkshop.id)
    })
    $scope.loading = $scope.loadingArma3Sync || $scope.loadingSteamWorkshop
  }

  const loadArma3SyncMods = function () {
    Arma3SyncSvc.mods().then(function (mods) {
      $scope.arma3syncMods = mods
      $scope.loadingArma3Sync = false
      updateMods()
    })
  }

  loadArma3SyncMods()

  const loadSteamWorkshopMods = function () {
    SteamWorkshopSvc.mods($scope.operationId).then(function (mods) {
      $scope.steamWorkshopIds = mods.map(function (mod) {
        return mod.steam_workshop_id
      })
      $scope.loadingSteamWorkshop = false
      updateMods()
    })
  }

  loadSteamWorkshopMods()
})
