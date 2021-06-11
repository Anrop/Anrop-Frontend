angular.module('operations').factory('AARSvc', function ($http, ApiConfig) {
  return {
    missions: function () {
      return $http.get(ApiConfig.BASE_AAR_API + '/missions').then(function (response) {
        return response.data
      })
    },
    mission: function (id) {
      return $http.get(ApiConfig.BASE_AAR_API + '/missions/' + id).then(function (response) {
        return response.data
      })
    },
    operation: function (operationId) {
      return $http.get(ApiConfig.BASE_API + '/operations/' + operationId + '/aar').then(function (response) {
        return response.data
      })
    },
    add: function (operationId, data) {
      return $http.post(ApiConfig.BASE_API + '/operations/' + operationId + '/aar', {
        aar: data
      }).then(function (response) {
        return response.data
      })
    },
    delete: function (operationId, id) {
      return $http.delete(ApiConfig.BASE_API + '/operations/' + operationId + '/aar/' + id).then(function (response) {
        return response.data
      })
    }
  }
})
