(function () {
'use strict';

angular.module('wasatchSportsRes')
  .controller('ViewReservationCtrl', ViewReservationCtrl);

  ViewReservationCtrl.$inject = ['reservationService', '$stateParams', '$state', 'renterService'];

  function ViewReservationCtrl(reservationService, $stateParams, $state, renterService) {
    var viewReservationCtrl = this;

    reservationService.getReservationById($stateParams.id).then(function(reservation) {
      viewReservationCtrl.reservation = reservation;
    });

    viewReservationCtrl.text = 'V I E W R E S E R V A T I O N';
    viewReservationCtrl.markComplete = markComplete;

    ////////////////

    function markComplete(id) {
      reservationService.markComplete(id)
        .then(function(res) {
          toastr.success('Reservation complete');
          $state.go('queue');
        }, function() {
          toastr.success('Reservation failed');
        });
    }

  }
})();
