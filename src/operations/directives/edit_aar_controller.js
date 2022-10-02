angular.module('operations').directive('editAarController', function () {
  return {
    controller: 'EditAARCtrl',
    scope: {
      operationId: '='
    },
    template: require('../templates/edit_aar_controller.html')
  }
})
