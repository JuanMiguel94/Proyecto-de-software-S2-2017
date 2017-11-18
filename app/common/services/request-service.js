angular.module('saaApp').factory('requestService', function ($http) {

    return {
      getRequest: function (data, configs) {
        return $http(
          {
            method: 'GET',
            url: configs.url + data.params,
            data: data.data
          })
          .then(function(response) {
            return response.data;

          },
          function errorCallback(response) {
            response.data.success = false;
            response.data.message = null;
            return response.data;
        });
      },

      postRequest: function(data, configs) {
        return $http(
          {
            method: 'POST',
            url: configs.url + data.params,//malo
            data: data.data
          })
          .then(function(response) {
            return response.data;
          },
          function errorCallback(response) {
            response.data.success = false;
            response.data.message = null;
            return response.data;
          });
      },

      putRequest: function (data, configs) {
        return $http(
          {
            method: 'PUT',
            url: configs.url + data.params,
            data: data.data
          })
          .then(function(response) {
            return response.data;
          },
          function errorCallback(response) {
            //response.dat
            response.data.success = false;
            response.data.message = null;
            return response.data;
        });
      },

      deleteRequest: function (data, configs) {
        return $http(
          {
            method: 'DELETE',
            url: configs.url + data.params,
            data: data.data
          })
          .then(function(response) {
            return response.data;
          },
          function errorCallback(response) {
            //response.dat
            response.data.success = false;
            response.data.message = null;
            return response.data;
        });
      }
    };
});
