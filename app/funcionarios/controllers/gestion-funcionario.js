/**
 /**
 * @ngdoc Controller
 * @author Jose Alberto Hidalgo Bonilla
 * @name GestionFuncionariosCtrl
 * @description
 * #  controller para gestion de funcionarios
 */ 
(function(){
	'use strict';
	angular
		.module('saaApp')
	    .controller('GestionFuncionariosCtrl', ['$scope', '$state', 'funcionarioService', 'shareFuncionarioService', 'messageHandlerService', 'shareSessionService', "$uibModal","confirmationModalService", 
	    function($scope, $state, funcionarioService, shareFuncionarioService, messageHandlerService, shareSessionService, $uibModal,confirmationModalService){
	    	
			$scope.user = {};
	    	$scope.funcionarioList = [];
	    	$scope.mdlTag = "";
			$scope.filters = 0; 

			$scope.viewsVisibility = {
				showFind: true,
				showfuncionarioList: true,
				showfuncionarioUpdate: false
			};

			$scope.getFuncionarioList = function() {
				funcionarioService.getFuncionarioList().then(function(result) {
					if(result.success) {
						$scope.funcionarioList = result.data;
					}
					else {
						messageHandlerService.notifyWarning(null, result.message);
					}
				});
			};

			$scope.sendToFuncionarioView = function(pId) {
				shareFuncionarioService.setFuncionarioId(pId);
				$state.go('ver-funcionario');
			};

			$scope.sendToUpdateFuncionarioView = function(pId) {
				shareFuncionarioService.setFuncionarioId(pId);
				$state.go('actualizar-funcionario');
			};

			$scope.disableFuncionario = function(pId) {
				$scope.openConfirmationModal(function(response){
					if (!response.success){
						return;
					}
					var data = {funcionarioId: pId, usuario: $scope.user.usuario};
					funcionarioService.disableFuncionario(data).then(function(result) {
						if(result.success) {
							messageHandlerService.notifySuccess(null, result.message);	
							$scope.funcionarioList = [];
							$scope.getFuncionarioList();
						}
						else {
							messageHandlerService.notifyWarning(null, result.message);
						}
					});
				});
			};

			$scope.getUser = function() {
				$scope.user = shareSessionService.getSession();
			};

			var setModalContent = function(mTitle, mMessage){
				confirmationModalService.setModalContent(mTitle, mMessage);
			};

			$scope.openConfirmationModal = function (callback) {
				setModalContent('Deshabilitar funcionario', '¿Está seguro(a) de que desea deshabilitar el funcionario?');
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

			$scope.getUser();
			$scope.getFuncionarioList();
		}]);	
})();
