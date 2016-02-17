(function () {
'use strict';

angular.module('wasatchSportsRes')
  .controller('HomeCtrl', HomeCtrl);

  HomeCtrl.$inject = ['$http'];

  function HomeCtrl($http) {
    var homeCtrl = this;

    homeCtrl.text = 'Welcome to Wasatch Sports!';
    // homeCtrl.test = test;

    ////////////////

    function test() {
      return $http
        .get('/test')
        .then(function() {
          toastr.success('Successful Test!');
        }, function() {
          toastr.error('Failed Test!');
        });
    }

  }
})();
