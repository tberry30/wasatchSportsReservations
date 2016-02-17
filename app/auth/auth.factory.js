(function () {
'use strict';

angular.module('wasatchSportsRes')
  .factory('AuthFactory', AuthFactory);

  AuthFactory.$inject = ['$rootScope', '$http', 'authTokenFactory', '$state', 'AUTH_EVENTS', '$q'];

  function AuthFactory($rootScope, $http, authTokenFactory, $state, AUTH_EVENTS, $q) {
    return {

      userId: null,
      username: null,
      userRole: null,

      register: register,
      login: login,
      getUser: getUser,
      logout: logout,
      isAuthenticated: isAuthenticated,
      isAuthorized: isAuthorized,

      create: create,
      destroy: destroy

    };

    //////////////////

    function register(newUser) {
      return $http
        .post('/register', newUser)
        .then(function(res) {
          authTokenFactory.setToken(res.data.token);
          var user =  getUser();
          $rootScope.$broadcast('currentUser', user);
          $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
          return {
            message: res.data.message,
            user: user
          }
        }, function() {
          $rootScope.broadcast(AUTH_EVENTS.loginFailed);
        });
    }

    function login(credentials) {
      var deferred = $q.defer();
      $http
        .post('/login', credentials)
        .then(function(res) {
          authTokenFactory.setToken(res.data.token);
          var user =  getUser();
          $rootScope.$broadcast('currentUser', user);
          // $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
          return deferred.resolve({
            message: res.data.message,
            user: user
          });
      }, function(res) {
        return deferred.reject(res.data);
        // $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
      });
      return deferred.promise;

    }

    function getUser() {
      var currentUser = authTokenFactory.getToken();
      if (currentUser) {
        return JSON.parse(atob(currentUser.split('.')[1]));
      } else {
        return null;
      }
    }

    function logout() {
      authTokenFactory.setToken();
      $state.go('home');
    }

    function isAuthenticated() {
      return !!getUser();
    }

    function isAuthorized(authorizedRoles) {
      if (!angular.isArray(authorizedRoles)) {
        authorizedRoles = [authorizedRoles];
      }
      return (isAuthenticated() && authorizedRoles.indexOf(getUser().role) !== -1);
    }

    function create(userId, username, userRole) {
      userId = userId;
      username = username;
      userRole = userRole;
    }

    function destroy() {
      userId: null;
      username: null;
      userRole: null;
    }

  }
})();
