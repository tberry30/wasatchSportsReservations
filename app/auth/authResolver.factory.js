(function () {
'use strict';

angular.module('wasatchSportsRes')
  .factory('AuthResolver', AuthResolver);

  AuthResolver.$inject = ['$rootScope', '$q', '$state'];

  function AuthResolver($rootScope, $q, $state) {
    return {
      resolve: resolve
    };

    //////////////////

    function resolve() {
      var deferred = $q.defer();
      var unwatch = $rootScope.$watch('currentUser', function (currentUser) {
        if (angular.isDefined(currentUser)) {
          if (currentUser) {
            deferred.resolve(currentUser);
          } else {
            deferred.reject();
            $state.go('login');
          }
          unwatch();
        }
      });
      return deferred.promise;
    }

  }
})();
