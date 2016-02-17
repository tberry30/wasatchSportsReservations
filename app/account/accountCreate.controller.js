(function () {
'use strict';

angular.module('wasatchSportsRes')
  .controller('AccountCreateCtrl', AccountCreateCtrl);

  AccountCreateCtrl.$inject = ['AuthFactory', '$state', 'reservationService'];

  function AccountCreateCtrl(AuthFactory, $state, reservationService) {
    var accountCreateCtrl = this;

    accountCreateCtrl.create = create;
    accountCreateCtrl.text = 'C R E A T E A C C O U N T';

    ////////////////

    function create(newUser) {
      AuthFactory.register(newUser)
      .then(function(response) {
        $state.go('account')
        toastr.success(response.message);
      }, function() {
        toastr.success('Something went wrong!');
      });
    }

  }
})();
