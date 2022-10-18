angular.module('operations').controller('SteamWorkshopHTMLCtrl', function ($scope, $uibModalInstance, $window, SteamWorkshopSvc) {
  const workshopRegex = /"https?:\/\/steamcommunity\.com\/sharedfiles\/filedetails\/\?id=(?<id>\d+)"/g
  $scope.mods = []
  $scope.content = false

  $scope.$watch('file', function () {
    if ($scope.file) {
      $scope.handleHTML($scope.file)
    }
  })

  $scope.handleHTML = function (file) {
    const reader = new $window.FileReader()

    reader.onload = function (ev) {
      const content = ev.target.result
      const mods = []
      for (const match of content.matchAll(workshopRegex)) {
        mods.push({
          id: match.groups.id
        })
      }

      mods.forEach(function (mod) {
        SteamWorkshopSvc.info(mod.id).then(function (info) {
          Object.assign(mod, {
            link: info.link,
            title: info.title,
            fileSize: info.fileSize,
            fileSizeFormatted: info.fileSizeFormatted
          })
        })
      })
      $scope.mods = mods
      $scope.content = true
    }

    reader.readAsText(file)
  }

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
})
