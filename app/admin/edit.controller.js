(function () {
'use strict';

angular.module('wasatchSportsRes')
  .controller('EditCtrl', EditCtrl);

  EditCtrl.$inject = ['userService', '$stateParams', '$state'];

  function EditCtrl(userService, $stateParams, $state) {
    var editCtrl = this;

    userService.getUser($stateParams.id).then(function(user) {
      editCtrl.userToEdit = user;
    });

    editCtrl.text = 'E D I T';
    editCtrl.update = update;
    editCtrl.remove = remove;

    ////////////////

    function update(userToEdit) {
      userService.update(userToEdit)
        .then(function(res) {
          toastr.success('User updated');
          $state.go('admin')
        }, function() {
          console.log('oops');
        });
    }

    function remove(id) {
      userService.remove(id)
        .then(function(res) {
          toastr.success('User deleted');
        }, function() {
          console.log('oops');
        });
    }


  }
})();
