angular.module('operations').controller('Arma3SyncCtrl', function ($scope, $uibModalInstance, Arma3SyncSvc) {
  $scope.filter = {
    query: ''
  }
  $scope.mods = []

  $scope.filterMods = function (query) {
    const lowerCasedFilter = query && query.toLowerCase()
    const steamWorkshopId = parseInt(query, 10) || null
    return function (item) {
      if (!query) {
        return true
      }

      const matchesName = lowerCasedFilter && item.name && item.name.toLowerCase().indexOf(lowerCasedFilter) >= 0
      const matchesSteamWorkshopId = steamWorkshopId && item.steamWorkshop && item.steamWorkshop.id === steamWorkshopId
      const matchesSteamWorkshopName = item.steamWorkshop && item.steamWorkshop.name && item.steamWorkshop.name.toLowerCase().indexOf(lowerCasedFilter) >= 0
      return matchesName || matchesSteamWorkshopId || matchesSteamWorkshopName
    }
  }

  $scope.close = function () {
    $uibModalInstance.dismiss('cancel')
  }

  const loadMods = function () {
    Arma3SyncSvc.mods().then(function (mods) {
      $scope.mods = mods
    })
  }

  loadMods()
})
