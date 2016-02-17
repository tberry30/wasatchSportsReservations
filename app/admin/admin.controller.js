(function () {
'use strict';

angular.module('wasatchSportsRes')
  .controller('AdminCtrl', AdminCtrl);

  AdminCtrl.$inject = ['userService'];

  function AdminCtrl(userService) {
    var adminCtrl = this;

    // Initialize users data
    userService.getUsers().then(function(users) {
      adminCtrl.users = users;
    });

    adminCtrl.text = 'A D M I N';
    adminCtrl.getUser = getUser;

    ////////////////

    function getUser() {
      userService.getUser(id)
        .then(function(users) {
          adminCtrl.user = user;
        });
    }


  }
})();
