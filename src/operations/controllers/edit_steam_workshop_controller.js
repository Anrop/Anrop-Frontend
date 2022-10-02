angular.module('operations').controller('EditSteamWorkshopCtrl', function ($scope, $uibModal, SteamWorkshopSvc) {
  $scope.add = function (data) {
    const newModId = parseInt(data.id, 10)
    const found = $scope.mods.filter(function (mod) {
      return mod.steam_workshop_id === newModId
    })

    if (found.length === 0) {
      return SteamWorkshopSvc.add($scope.operationId, { steam_workshop_id: newModId }).then(function () {
        loadMods()
        $scope.form = {}
        return this
      })
    }
  }

  $scope.delete = function (mod) {
    SteamWorkshopSvc.delete($scope.operationId, mod.id).then(function () {
      loadMods()
      return this
    })
  }

  $scope.findMod = function (data) {
    var modId = parseInt(data.id, 10)
    return $scope.mods.find(function (mod) {
      return mod.steam_workshop_id === modId
    })
  }

  $scope.hasMod = function (data) {
    return !!$scope.findMod(data)
  }

  $scope.search = function () {
    $uibModal.open({
      template: require('../templates/steam_workshop_search.html'),
      controller: 'SteamWorkshopSearchCtrl',
      scope: $scope
    }).result.then(function () {

    }, function () {

    })
  }

  $scope.suggestions = function () {
    $uibModal.open({
      template: require('../templates/steam_workshop_suggestions.html'),
      controller: 'SteamWorkshopSuggestionsCtrl',
      scope: $scope
    })
  }

  const loadMods = function () {
    SteamWorkshopSvc.mods($scope.operationId).then(function (mods) {
      mods.forEach(function (mod) {
        SteamWorkshopSvc.info(mod.steam_workshop_id).then(function (info) {
          Object.assign(mod, {
            link: info.link,
            title: info.title
          })
        })
      })
      $scope.mods = mods
    })
  }

  loadMods()
})
