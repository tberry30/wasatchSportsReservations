(function () {
'use strict';

angular.module('wasatchSportsRes')
  .directive('loginModal', loginModal);

  loginModal.$inject = ['AUTH_EVENTS'];

  function loginModal(AUTH_EVENTS) {
    return {
      restrict: 'E',
      replace: 'true',
      templateUrl: './login/login.template.html',
      controller: 'LoginCtrl',
      controllerAs: 'loginCtrl',
      // bindToController: 'true',
      link: function (scope) {
        var showDialog = function () {
          scope.visible = true;
        };
        var hideDialog = function () {
          scope.visible = false;
        };
        scope.visible = false;

        scope.$on(AUTH_EVENTS.loginRequest, showDialog);
        scope.$on(AUTH_EVENTS.notAuthenticated, showDialog);
        scope.$on(AUTH_EVENTS.sessionTimeout, showDialog);
        scope.$on(AUTH_EVENTS.loginSuccess, hideDialog);
      }
    }
  }

})();
