/**
 /**
 * @ngdoc Controller
 * @author Luis Javier Ramírez Torres
 * @name GestionDependenciassCtrl
 * @description
 * #  controller para gestion de Dependencias
 */ 


(function(){
	'use strict';
	angular
		.module('saaApp')
		.controller('GestionDependenciasCtrl', ['$scope', 'DependenciaService', 'messageHandlerService', 'shareSessionService',"$uibModal","confirmationModalService",
		 function($scope, dependenciaService, messageHandlerService, shareSessionService,$uibModal,confirmationModalService){
			
			$scope.dependencyList = {};
		  	$scope.inputDependency = {};
		  	$scope.user = {};
		  	$scope.getDependencies = function(){
		  		dependenciaService.getDependencies().then(function(result){
		  			if (result.success){
						$scope.dependencyList = result.data;
	  				}
	  				else{
	  					$scope.dependencyList = {};
	  					messageHandlerService.notifyWarning(null, result.message);
	  				}
		  		});
		  	};

		  	$scope.editDependency = function(dependencyToEdit){
		      	$scope.inputDependency.codigo = dependencyToEdit.codigo;
		        $scope.inputDependency.nombre = dependencyToEdit.nombre;
		      	$scope.inputDependency.id = dependencyToEdit.id;
		  	};

		  	$scope.updateDependency = function (dependencyToUpdate) {
		  		dependencyToUpdate.usuario = $scope.user.usuario;
		  		dependenciaService.editDependency(dependencyToUpdate).then(function(result) {
		  			if (result.success){
			        	$scope.getDependencies();
			          	messageHandlerService.notifySuccess(null, result.message)
			          	$scope.inputDependency = {};
			        }
			        else{
			          	messageHandlerService.notifyError(null, result.message);
			        }
		  		});
			};
		  	
			$scope.addDependency = function (newDep) {
				newDep.usuario = $scope.user.usuario;
				dependenciaService.addDependency(newDep).then(function(result) {
					if(result.success) {
						$scope.getDependencies();
			          	messageHandlerService.notifySuccess(null, result.message)
			        	
					}
					else{
						messageHandlerService.notifyError(null, result.message);
					}
				});
			};

			$scope.disableDependency = function(pId){
				$scope.openConfirmationModal(function(response){
	          	if (!response.success){
		            return;
		        }
		        var data = {idDependencia: pId, usuario: $scope.user.usuario};
		        dependenciaService.disableDependency(data).then(function(result){
		        	if(result.success == true){
		        		messageHandlerService.notifySuccess(null, result.message);
		              	$scope.getDependencies();
		              	$scope.inputDependency = {};
		            }
		            else{
		                messageHandlerService.notifyError(null, result.message);
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
        		setModalContent('Deshabilitar Dependencia', '¿Está seguro(a) de que desea deshabilitar la dependencia?');
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
		  	$scope.getDependencies();
		}]);
})();
