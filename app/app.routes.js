(function() {
'use strict';

angular.module('wasatchSportsRes')
  .config(configure)
  .run(runConfigure);

  configure.$inject = ['$stateProvider', '$urlRouterProvider', 'USER_ROLES'];

  function configure($stateProvider, $urlRouterProvider, USER_ROLES) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: './home/home.template.html',
        controller: 'HomeCtrl',
        controllerAs: 'homeCtrl'
      })
      .state('create-account', {
        url: '/create/account',
        templateUrl: './account/create.template.html',
        controller: 'AccountCreateCtrl',
        controllerAs: 'accountCreateCtrl'
      })
      .state('account', {
        url: '/account',
        templateUrl: './account/account.template.html',
        data: { authorizedRoles: [USER_ROLES.customer] },
        controller: 'AccountCtrl',
        controllerAs: 'accountCtrl'
      })
      .state('create-reservation', {
        url: '/create/reservation',
        templateUrl: './reservations/create.template.html',
        data: { authorizedRoles: [USER_ROLES.admin, USER_ROLES.tech, USER_ROLES.customer] },
        controller: 'ReservationCtrl',
        controllerAs: 'reservationCtrl'
      })
      .state('view-reservation', {
        url: '/view/reservation/:id',
        templateUrl: './reservations/reservation.template.html',
        data: { authorizedRoles: [USER_ROLES.admin, USER_ROLES.tech, USER_ROLES.customer] },
        controller: 'ViewReservationCtrl',
        controllerAs: 'viewReservationCtrl'
      })
      .state('edit-user', {
        url: '/edit-user/:id',
        templateUrl: './admin/edit.template.html',
        data: { authorizedRoles: [USER_ROLES.admin, USER_ROLES.tech, USER_ROLES.customer] },
        controller: 'EditCtrl',
        controllerAs: 'editCtrl'
      })
      .state('edit-renter', {
        url: '/edit-renter/:id/:parentRes',
        templateUrl: './reservations/editRenter.template.html',
        data: { authorizedRoles: [USER_ROLES.admin, USER_ROLES.tech, USER_ROLES.customer] },
        controller: 'EditRenterCtrl',
        controllerAs: 'editRenterCtrl'
      })
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: './dashboard/dashboard.template.html',
        data: { authorizedRoles: [USER_ROLES.admin, USER_ROLES.tech] },
        controller: 'DashboardCtrl',
        controllerAs: 'dashboardCtrl'
      })
      .state('queue', {
        url: '/queue',
        templateUrl: './queue/queue.template.html',
        data: { authorizedRoles: [USER_ROLES.admin, USER_ROLES.tech] },
        controller: 'QueueController',
        controllerAs: 'queueController'
      })
      .state('admin', {
        url: '/admin',
        templateUrl: './admin/admin.template.html',
        data: {
          authorizedRoles: [USER_ROLES.admin] },
        controller: 'AdminCtrl',
        controllerAs: 'adminCtrl'
      });
  }

  runConfigure.$inject = ['$rootScope', 'AUTH_EVENTS', 'AuthFactory', '$timeout'];

  function runConfigure($rootScope, AUTH_EVENTS, AuthFactory, $timeout) {

    var user = AuthFactory.getUser();
    if (user) {
      $timeout(function(){
        $rootScope.$broadcast('currentUser', user);
      });
    }

    $rootScope.$on('$stateChangeStart', function (event, next) {
      if (next.data) {
        var authorizedRoles = next.data.authorizedRoles;
        if (!AuthFactory.isAuthorized(authorizedRoles)) {
          event.preventDefault();
          if (AuthFactory.isAuthenticated()) {
            // user is not allowed
            toastr.error('Not Allowed!');
            $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
          } else {
            // user is not logged in
            toastr.error('Not Logged In.');
            $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
          }
        }
      }
    });
  }

})();
