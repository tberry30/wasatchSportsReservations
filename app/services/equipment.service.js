(function () {
'use strict';

angular.module('wasatchSportsRes')
  .service('equipmentService', equipmentService);

  equipmentService.$inject = ['$http', '$q'];

  function equipmentService($http, $q) {
    var equipmentService = this;

    equipmentService.getEquipment = function() {
      return $http
        .get('/api/equipment')
        .then(function(res) {
          var equip = res.data;
          return equip;
        });
    };

    equipmentService.addEquipToRenter = function(renterId, equipId) {
      return $http
        .put('/api/addEquipToRenter/' + renterId, { "equipId" : equipId })
        .then(function(res) {
          var equip = res.data;
          return equip;
        });
    };

  }
})();
