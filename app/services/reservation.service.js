(function () {
'use strict';

angular.module('wasatchSportsRes')
  .service('reservationService', reservationService);

  reservationService.$inject = ['$http', '$q'];

  function reservationService($http, $q) {
    var reservationService = this;

    reservationService.createRes = function(newReservation) {
      var deferred = $q.defer()
      $http
        .post('/api/reservations', newReservation)
        .then(function(res) {
          return deferred.resolve(res.data);
        }, function(res) {
          return deferred.reject(res.data.message);
        });
      return deferred.promise;
    };

    reservationService.getReservations = function() {
      var deferred = $q.defer()
      $http
        .get('/api/reservations')
        .then(function(res) {
          return deferred.resolve(res.data);
        }, function(res) {
          return deferred.reject(res.data.message);
        });
      return deferred.promise;
    };

    reservationService.getQueue = function() {
      var deferred = $q.defer()
      $http
        .get('/api/queue')
        .then(function(res) {
          return deferred.resolve(res.data);
        }, function(res) {
          return deferred.reject(res.data.message);
        });
      return deferred.promise;
    };

    reservationService.getReservationsByUser = function(userId) {
      var deferred = $q.defer()
      $http
        .get('/api/reservations/' + userId)
        .then(function(res) {
          return deferred.resolve(res.data);
        }, function(res) {
          return deferred.reject(res.data.message);
        });
      return deferred.promise;
    };

    reservationService.getReservationById = function(id) {
      var deferred = $q.defer()
      $http
        .get('/api/reservation/' + id)
        .then(function(res) {
          return deferred.resolve(res.data);
        }, function(res) {
          return deferred.reject(res.data.message);
        });
      return deferred.promise;
    };

    reservationService.addToQueue = function(id) {
      var deferred = $q.defer()
      $http
        .put('/api/addToQueue/' + id)
        .then(function(res) {
          return deferred.resolve(res.data);
        }, function(res) {
          return deferred.reject(res.data);
        });
      return deferred.promise;
    };

    reservationService.removeFromQueue = function(id) {
      var deferred = $q.defer()
      $http
        .put('/api/removeFromQueue/' + id)
        .then(function(res) {
          return deferred.resolve(res.data);
        }, function(res) {
          return deferred.reject(res.data);
        });
      return deferred.promise;
    };

    reservationService.markComplete = function(id) {
      var deferred = $q.defer()
      $http
        .put('/api/markReservationComplete/' + id)
        .then(function(res) {
          return deferred.resolve(res.data);
        }, function(res) {
          return deferred.reject(res.data);
        });
      return deferred.promise;
    };



  }
})();
