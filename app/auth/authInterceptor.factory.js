(function () {
'use strict';

angular.module('wasatchSportsRes')
  .factory('AuthInterceptor', AuthInterceptor);

  AuthInterceptor.$inject = ['$rootScope', '$q', 'AUTH_EVENTS', 'authTokenFactory'];

  function AuthInterceptor($rootScope, $q, AUTH_EVENTS, authTokenFactory) {
    return {
      request: addAuthToken,
      responseError: responseError
    };

    //////////////////

    function addAuthToken(config) {
      var token = authTokenFactory.getToken();
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = 'Bearer ' + token;
      }
      return config;
    }

    function responseError(response) {
      $rootScope.$broadcast({
        401: AUTH_EVENTS.notAuthenticated,
        403: AUTH_EVENTS.notAuthorized,
        419: AUTH_EVENTS.sessionTimeout,
        440: AUTH_EVENTS.sessionTimeout
      }[response.status], response);
      return $q.reject(response);
    }

  }
})();
