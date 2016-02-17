(function () {
'use strict';

angular.module('wasatchSportsRes')
  .service('userService', userService);

  userService.$inject = ['$http'];

  function userService($http) {
    var userService = this;

    userService.getUsers = function() {
      return $http
        .get('/api/users')
        .then(function(res) {
          var users = res.data;
          return users;
        });
    };

    userService.getUser = function(id) {
      return $http
        .get('/api/users/' + id)
        .then(function(res) {
          return res.data;
        });
    };

    userService.update = function(userToEdit) {
      return $http
        .put('/api/users/' + userToEdit._id, userToEdit)
        .then(function(res) {
          return res.data;
        });
    }

    userService.remove = function(id) {
      return $http
        .delete('/api/users/' + id)
        .then(function(res) {
          return res.data;
        }, function(res) {
          return res.data;
        });
    }


  }
})();
