(function() {
'use strict';

angular.module('wasatchSportsRes', ['ui.router', 'ngMessages', 'angularMoment'])

.constant('AUTH_EVENTS', {
  loginRequest: 'auth-login-request',
  loginSuccess: 'auth-login-success',
  loginFailed: 'auth-login-failed',
  logoutSuccess: 'auth-logout-success',
  sessionTimeout: 'auth-session-timeout',
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'
})
.constant('USER_ROLES', {
  all: '*',
  admin: 'admin',
  tech: 'tech',
  customer: 'customer'
})
.config(configure);

configure.$inject = ['$httpProvider'];

function configure($httpProvider) {
  $httpProvider.interceptors.push([
    '$injector',
    function ($injector) {
      return $injector.get('AuthInterceptor');
    }
  ]);
}

})();
