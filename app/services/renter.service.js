(function () {
'use strict';

angular.module('wasatchSportsRes')
  .service('renterService', renterService);

  renterService.$inject = ['$http', '$q'];

  function renterService($http, $q) {
    var renterService = this;

    renterService.getRenter = function(id) {
      return $http
        .get('/api/renters/' + id)
        .then(function(res) {
          return res.data;
        });
    };

    renterService.addRenter = function(newRenter) {
      var deferred = $q.defer()
      $http
        .post('/api/renters', newRenter)
        .then(function(res) {
          return deferred.resolve(res.data);
        }, function(res) {
          return deferred.reject(res.data.message);
        });
      return deferred.promise;
    };

    renterService.editRenter = function(renter) {
      var deferred = $q.defer()
      $http
        .put('/api/renters/' + renter._id, renter)
        .then(function(res) {
          return deferred.resolve(res.data);
        }, function(res) {
          return deferred.reject(res.data.message);
        });
      return deferred.promise;
    };

    renterService.removeRenter = function(id) {
      return $http
        .delete('/api/renters/' + id)
        .then(function(res) {
          return res.data;
        }, function(res) {
          return res.data;
        });
    }

  }
})();
