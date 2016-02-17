(function () {
'use strict';

angular.module('wasatchSportsRes')
  .controller('EditRenterCtrl', EditRenterCtrl);

  EditRenterCtrl.$inject = ['renterService', 'equipmentService', '$stateParams', '$state'];

  function EditRenterCtrl(renterService, equipmentService, $stateParams, $state) {
    var editRenterCtrl = this;

    editRenterCtrl.text = 'E D I T R E N T E R';

    renterService.getRenter($stateParams.id).then(function(renter) {
      editRenterCtrl.renter = renter;
    });

    equipmentService.getEquipment().then(function(equipment) {
      editRenterCtrl.equipment = equipment;
    });

    editRenterCtrl.editRenter = editRenter;
    editRenterCtrl.removeRenter = removeRenter;
    editRenterCtrl.addEquipToRenter = addEquipToRenter;

    // editRenterCtrl.parentRes = $stateParams.parentRes;

    ////////////////

    function editRenter(renter) {
      renterService.editRenter(renter)
        .then(function(res) {
          toastr.success('Renter updated');
          $state.go('view-reservation', {id: $stateParams.parentRes});
        }, function() {
          toastr.success('Update failed');
        });
    }

    function removeRenter(id) {
      renterService.removeRenter(id)
        .then(function(res) {
          toastr.success('Renter deleted');
          $state.go('view-reservation', {id: $stateParams.parentRes});
        }, function() {
          toastr.success('Remove failed');
        });
    }

    function addEquipToRenter(renterId, equipId) {
      equipmentService.addEquipToRenter(renterId, equipId)
        .then(function(res) {
          toastr.success('Equipment added');
          $state.go('view-reservation', {id: $stateParams.parentRes});
        }, function() {
          toastr.success('Equipment addition failed');
        });
    }


  }
})();
