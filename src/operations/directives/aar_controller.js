angular.module('operations').directive('aarController', function () {
  return {
    controller: 'AARCtrl',
    scope: {
      operationId: '='
    },
    template: require('../templates/aar_controller.html')
  }
})
