angular.module('operations').controller('Arma3SyncCtrl', function ($scope, $uibModalInstance, Arma3SyncSvc) {
  $scope.filter = {
    query: ''
  }
  $scope.mods = []

  $scope.filterMods = function (query) {
    const lowerCasedFilter = query && query.toLowerCase()
    const steamWorkshopId = parseInt(query, 10) || null
    return function (item) {
      const matchesName = lowerCasedFilter && item.name && item.name.toLowerCase().indexOf(lowerCasedFilter) >= 0
      const matchesSteamWorkshop = steamWorkshopId && item.steamWorkshop && item.steamWorkshop.id === steamWorkshopId
      return matchesName || matchesSteamWorkshop
    }
  }

  $scope.close = function () {
    $uibModalInstance.dismiss('cancel')
  }

  const loadMods = function () {
    Arma3SyncSvc.mods($scope.operationId).then(function (mods) {
      $scope.mods = mods
    })
  }

  loadMods()
})
