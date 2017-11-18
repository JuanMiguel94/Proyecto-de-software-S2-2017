/**
 /**
 * @ngdoc Controller
 * @author Jose Alberto Hidalgo Bonilla
 * @name GestionPlazasCtrl
 * @description
 * #  controller para gestion de plazas
 */ 
(function(){
	'use strict';
	angular
		.module('saaApp')
	    .controller('GestionPlazasCtrl', ['$scope', '$state', 'PlazaService', 'sharePlazaService', 'messageHandlerService',"$uibModal","confirmationModalService", "shareSessionService", 
	    function($scope, $state, plazaService, sharePlazaService, messageHandlerService,$uibModal,confirmationModalService, shareSessionService){
	    	
	    	$scope.plazaList = [];
	    	$scope.mdlTag = "";
			$scope.filters = 0; 
			$scope.user = {};
			$scope.viewsVisibility = {
				showFind: true,
				showPlazaList: true,
				showPlazaUpdate: false
			};

			$scope.getPlazaList = function() {
				plazaService.getPlazaList().then(function(result) {
					if(result.success) {
						$scope.plazaList = result.data;
					}
					else {
						messageHandlerService.notifyWarning(null, result.message);
					}
				});
			};

			$scope.sendToPlazaView = function(pId) {
				sharePlazaService.setPlazaId(pId);
				$state.go('ver-plaza');
			};

			$scope.sendToUpdatePlazaView = function(pId) {
				sharePlazaService.setPlazaId(pId);
				$state.go('actualizar-plaza');
			};

			$scope.disablePlaza = function(pId) {
				$scope.openConfirmationModal(function(response){
					if (!response.success){
						return;
					}
					var data = {id: pId, usuario: $scope.user.usuario};
					plazaService.disablePlaza(data).then(function(result) {
						if(result.success) {
							messageHandlerService.notifySuccess(null, result.message);	
							$scope.plazaList = [];
							$scope.getPlazaList();
						}
						else {
							messageHandlerService.notifyWarning(null, result.message);
						}
					});
				});
			};

			var setModalContent = function(mTitle, mMessage){
				confirmationModalService.setModalContent(mTitle, mMessage);
      		};

		    $scope.openConfirmationModal = function (callback) {
		    	setModalContent('Deshabilitar plaza', '¿Está seguro(a) de que desea deshabilitar la plaza?');
		        var modalInstance = $uibModal.open({
		          animation: true,
		          templateUrl: 'confirmationModalTemplate.html',
		          controller: 'ModalInstanceCtrl',
		          size: 'sm',
		          resolve: {}
		        });

		        modalInstance.result.then(
		          function (confirmationResponse) {
		            callback({
		              success: confirmationResponse
		            });
		        }, function () {
		          callback({
		              success: false
		            });
		        });
		    };
			
			$scope.getUser = function() {
				$scope.user = shareSessionService.getSession();
			};

			$scope.getUser();
			$scope.getPlazaList();
		}]);	
})();
