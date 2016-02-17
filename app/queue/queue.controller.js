(function () {
'use strict';

angular.module('wasatchSportsRes')
  .controller('QueueController', QueueController);

  QueueController.$inject = ['reservationService', '$state', 'socketFactory'];

  function QueueController(reservationService, $state, socketFactory) {
    var queueController = this;

    // SOCKET.IO
    socketFactory.on('queue', function(reservation) {
      queueController.reservations.push(reservation);
    });
    socketFactory.on('q_update', function(reservation) {
      $state.reload();
    });

    reservationService.getQueue().then(function(res) {
      queueController.reservations = res;
    });

    queueController.text = 'Q U E U E';
    queueController.removeFromQueue = removeFromQueue;

    ////////////////

    function removeFromQueue(id) {
      reservationService.removeFromQueue(id)
        .then(function(res) {
          $state.reload();
        });
    }

  }
})();
