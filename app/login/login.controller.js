(function () {
'use strict';

angular.module('wasatchSportsRes')
  .controller('LoginCtrl', LoginCtrl);

  LoginCtrl.$inject = ['$rootScope', 'AUTH_EVENTS', 'AuthFactory', '$scope'];

  function LoginCtrl($rootScope, AUTH_EVENTS, AuthFactory, $scope) {
    var loginCtrl = this;

    loginCtrl.credentials = {
      username: '',
      password: ''
    };

    loginCtrl.login = login;

    loginCtrl.closeLogin = closeLogin;

    ///////////////

    function login(credentials) {
      AuthFactory.login(credentials).then(function(response) {
        loginCtrl.visible = false;
        // $scope.appCtrl.setCurrentUser(response.username);
        toastr.success(response.message + '.<br>Welcome, ' + response.user.firstName + '!');
        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
      }, function(response) {
        toastr.error(response);
        // $rootScope.broadcast(AUTH_EVENTS.loginFailed);
      });
    }

    function closeLogin() {
      $scope.visible = false;
    }


  }
})();
