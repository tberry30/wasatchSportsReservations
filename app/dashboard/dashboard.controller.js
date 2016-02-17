(function () {
'use strict';

angular.module('wasatchSportsRes')
  .controller('DashboardCtrl', DashboardCtrl);

  DashboardCtrl.$inject = ['reservationService', '$state', 'socketFactory'];

  function DashboardCtrl(reservationService, $state, socketFactory) {
    var dashboardCtrl = this;

    // SOCKET.IO
    socketFactory.on('dashboard', function(reservation) {
      dashboardCtrl.reservations.push(reservation);
    });
    socketFactory.on('db_update', function(reservation) {
      $state.reload();
    });


    reservationService.getReservations().then(function(res) {
      dashboardCtrl.reservations = res;
      console.log(dashboardCtrl.reservations);
    });

    dashboardCtrl.text = 'D A S H B O A R D';
    dashboardCtrl.addToQueue = addToQueue;

    ////////////////

    function addToQueue(id) {
      reservationService.addToQueue(id)
        .then(function(res) {
          $state.reload();
        });
    }

  }
})();
