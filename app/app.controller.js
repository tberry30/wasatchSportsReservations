(function () {
'use strict';

angular.module('wasatchSportsRes')
  .controller('AppCtrl', AppCtrl);

  AppCtrl.$inject = ['$rootScope', 'USER_ROLES', 'AUTH_EVENTS', 'AuthFactory', '$scope'];

  function AppCtrl($rootScope, USER_ROLES, AUTH_EVENTS, AuthFactory, $scope) {
    var appCtrl = this;

    $scope.$on('currentUser', function(event, user) {
      setCurrentUser(user);
    });

    appCtrl.currentUser = null;
    appCtrl.userRoles = USER_ROLES;
    appCtrl.isAuthorized = AuthFactory.isAuthorized;

    appCtrl.login = login;
    appCtrl.logout = logout;
    appCtrl.setCurrentUser = setCurrentUser;

    toastr.options = {
      "closeButton": true,
      "timeOut": "2000"
    }

    ////////////////

    function login() {
      $rootScope.$broadcast(AUTH_EVENTS.loginRequest);
    }

    function logout(user) {
      AuthFactory.logout();
      appCtrl.currentUser = null;
    }

    function setCurrentUser(user) {
      appCtrl.currentUser = user;
    }

  }
})();
