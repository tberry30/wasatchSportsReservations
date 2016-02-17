(function () {
'use strict';

angular.module('wasatchSportsRes')
  .controller('AccountCtrl', AccountCtrl);

  AccountCtrl.$inject = ['AuthFactory', '$state', 'reservationService'];

  function AccountCtrl(AuthFactory, $state, reservationService) {
    var accountCtrl = this;

    
    reservationService.getReservationsByUser(AuthFactory.getUser().id).then(function(reservations) {
      accountCtrl.reservations = reservations;
    });

    accountCtrl.create = create;
    accountCtrl.text = 'M Y A C C O U N T';

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
