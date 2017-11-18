'use strict';

/**
 * @ngdoc Controller
 * @author Luis Javier Ramírez Torres
 * @name ModalInstanceCtrl
 * @description
 * #  controller para gestionar la respuestas de los modales
 */
angular.module('saaApp')
.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, confirmationModalService) {
  $scope.modalContent = {};

  $scope.ok = function () {
    $uibModalInstance.close(true);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
  var modalContent = function(){
  	$scope.modalContent = confirmationModalService.getModalContent();
  };

  modalContent();
});