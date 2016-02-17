(function () {
'use strict';

angular.module('wasatchSportsRes')
  .factory('authTokenFactory', authTokenFactory);

  authTokenFactory.$inject = ['$window'];

  function authTokenFactory($window) {
    return {
      setToken: setToken,
      getToken: getToken
    };

    //////////////////

    function setToken(token) {
      if (token) {
        $window.localStorage.setItem('token', token);
        return token;
      } else {
        $window.localStorage.removeItem('token');
      }
    }

    function getToken() {
      return $window.localStorage.getItem('token');
    }

  }
})();
