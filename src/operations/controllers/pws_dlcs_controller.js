angular.module('operations').controller('PwsDlcsCtrl', function ($scope, $uibModalInstance) {
  $scope.addDlc = function (dlc) {
    $scope.add({
      name: dlc.name
    })
  }

  $scope.dlcs = [
    {
      name: 'contact',
      title: 'Contact'
    },
    {
      name: 'csla',
      title: 'CSLA'
    },
    {
      name: 'gm',
      title: 'Global Mobilization'
    }
  ]

  $scope.close = function () {
    $uibModalInstance.dismiss('cancel')
  }
})
