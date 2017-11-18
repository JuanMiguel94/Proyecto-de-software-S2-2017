/**
 /**
 * @ngdoc Controller
 * @author Luis Javier Ramírez Torres
 * @name ActualizarProfesorCtrl
 * @description
 * #  controller para actualizar la informacion de un funcionario
 */ 
(function(){
	'use strict';
	angular
		.module('saaApp')
	    .controller('ActualizarFuncionarioCtrl', ['$scope', '$location', '$state', 'funcionarioService', 'academicService', 'recordService', 'shareSessionService', 'shareFuncionarioService', 'messageHandlerService', 
	    function($scope, $location, $state, funcionarioService, academicService,recordService, shareSessionService, shareFuncionarioService, messageHandlerService){

	    	$scope.funcionarioList = [];
	    	$scope.user = {};

	    	$scope.dateSettings = {
	    		dateFormat:'dd-MM-yyyy',
                showRegDate: false
	    	}; 

	    	$scope.yearDegreeSettings = {
			    yearFormat: 'yyyy',
			    startingDay: 1,
			    minMode: 'year',
			    showRegYear: false
			};
			
	    	$scope.funcionario = {
	    		infoPersonal: {
	    			cedulaFuncionario: '',
	    			nombreFuncionario: '',
	    			primerApellido: '',
	    			segundoApellido: '',
	    			fecha: '',
	    			especialidad: ''
	    		},
	    		infoAcademica: [],
	    		antecedentes: []
	    	};

	    	$scope.inputFuncionario = {
	    		infoAcademica: {
	    			titulo: '',
	    			universidad: '',
	    			grado: '',
	    			annoGraduacion:'' 
	    		},
	    		antecedente: {
	    			descripcion: ''
	    		}
	    		
	    	};

			$scope.funcionario.infoPersonal.fecha = new Date();
	    	$scope.inputFuncionario.infoAcademica.annoGraduacion = new Date();
	    	$scope.degreeList = ["Bachillerato", "Licenciatura", "Maestría", "Doctorado"];

	    	$scope.openDatePickerPopUp = function() {
		    	$scope.dateSettings.showRegDate = !$scope.dateSettings.showRegDate;
		      	return $scope.dateSettings.showRegDate;
		    };

		    $scope.openYearDegreePopUp = function($event) {
		    	$scope.yearDegreeSettings.showRegYear = !$scope.yearDegreeSettings.showRegYear;
		      	return $scope.yearDegreeSettings.showRegYear;
		    };

		    $scope.openYearEngagementPopUp = function($event) {
		    	$scope.yearEngagementSettings.showRegYear = !$scope.yearEngagementSettings.showRegYear;
		      	return $scope.yearEngagementSettings.showRegYear;
		    };

		    var cleanAcademicInfo = function() {
		    	$scope.inputFuncionario.infoAcademica.titulo = '';
	    		$scope.inputFuncionario.infoAcademica.universidad = ''; 
	    		$scope.inputFuncionario.infoAcademica.grado = '';
	    		$scope.inputFuncionario.infoAcademica.annoGraduacion = new Date(); 
		    };

		    var getFuncionariosList = function() {
				funcionarioService.getFuncionarioList().then(function(result) {
					if(result.success) {
						$scope.funcionarioList = result.data;
					}
					else {
						messageHandlerService.notifyWarning(null, result.message);
					}
				});
			};


	    	var getFuncionario = function(pId) {
				funcionarioService.getFuncionario(pId).then(function(result) {
					if(result.success) {
						$scope.funcionario.infoPersonal = result.data;
					}
					else {
						messageHandlerService.notifyWarning(null, result.message);
					}
				});
			};

			var getAcademicInfo = function(pId) {
				academicService.getAcademicFuncionarioInfo(pId).then(function(result) {
					if(result.success) {
						$scope.funcionario.infoAcademica = result.data;
					}
					else {
						$scope.funcionario.infoAcademica = [];
					}
				});
			};

			var addAcademicInfoFuncionario = function(pData) {
	    		academicService.newAcademicFuncionarioInfo(pData).then(function(result) {
					if(result.success) {
						cleanAcademicInfo(); 
						getAcademicInfo($scope.funcionario.id);
						messageHandlerService.notifySuccess(null, result.message);							
					}
					else {
						messageHandlerService.notifyWarning(null, result.message);	
					}
				});
	    	};

			var getRecords = function(pId) {
				recordService.getRecordFuncionarioList(pId).then(function(result) {
					if(result.success) {
						$scope.funcionario.antecedentes = result.data;
						
					}
					else {
						$scope.funcionario.antecedentes = [];
					}
				});
			};

			var addRecordInfoFuncionario = function(pData) {
	    		recordService.newRecordInfoFuncionario(pData).then(function(result) {
					if(result.success) {
						$scope.inputFuncionario.antecedente = {};
						getRecords($scope.funcionario.id);
						messageHandlerService.notifySuccess(null, result.message);						
					}
					else {
						messageHandlerService.notifyWarning(null, result.message);	
					}

				});

	    	};

	    	$scope.validRecordForm = function(pIsValid, pData) {
				//if(pIsValid) { 
					var data = {
						id: $scope.funcionario.id,
						params: pData
					}
					addRecordInfoFuncionario(data);
				//}
				//else {
					//var message = 'Debe completar la información de antecedentes de manera correcta';
					//messageHandlerService.notifyError(null, message);
				//}
			};


	    	$scope.validAcademicForm = function(pIsValid, pData) {
				//if(pIsValid && pData.grado != "") { 
					var data = {
						id: $scope.funcionario.id,
						params: pData
					}
					addAcademicInfoFuncionario(data);
				//}
				//else {
					//var message = 'Debe completar todos los campos de la información académica de manera correcta';
					//messageHandlerService.notifyError(null, message);
				//}
			};

	    	$scope.editFuncionarioTitulos = function(tituloToEdit){
	    		$scope.inputFuncionario.infoAcademica.id = tituloToEdit.id;
		      	$scope.inputFuncionario.infoAcademica.titulo = tituloToEdit.titulo;
		      	$scope.inputFuncionario.infoAcademica.universidad = tituloToEdit.universidad;
		      	$scope.inputFuncionario.infoAcademica.grado = tituloToEdit.gradoAcademico;
		        $scope.inputFuncionario.infoAcademica.annoGraduacion = tituloToEdit.annoGraduacion;
		  	};

		  	$scope.refrescarVistaTitulo = function(){
		  		$scope.funcionario.infoAcademica.forEach(function(titulo) {
    				if (titulo.id == $scope.inputFuncionario.infoAcademica.id) {
    					titulo.titulo = $scope.inputFuncionario.infoAcademica.titulo;
    					titulo.universidad = $scope.inputFuncionario.infoAcademica.universidad;
    					titulo.grado = $scope.inputFuncionario.infoAcademica.grado;
    					titulo.annoGraduacion = $scope.inputFuncionario.infoAcademica.annoGraduacion;
    					return;
    				}
				});
		  	}

		  	$scope.refrescarVistaAntecedente = function(){
		  		$scope.funcionario.antecedentes.forEach(function(antecedente){
		  			if (antecedente.id == $scope.inputFuncionario.antecedente.id) {
		  				antecedente.descripcion = $scope.inputFuncionario.antecedente.descripcion;
		  				return;
		  			}
		  		});
		  	}

		  	$scope.editFuncionarioAntecedentes = function(antecedenteToEdit){
		  		$scope.inputFuncionario.antecedente.id = antecedenteToEdit.id;
		  		$scope.inputFuncionario.antecedente.descripcion = antecedenteToEdit.descripcion;
		  	}


		  	$scope.updateFuncionario = function (pIsValid,funcionarioToUpdate) {
		  		//if (pIsValid) {
			  		funcionarioToUpdate.activo = 1;
			  		funcionarioToUpdate.usuario = $scope.user.usuario;
			  		funcionarioService.editFuncionario(funcionarioToUpdate).then(function(result) {
			  			if (result.success){
				        	//$scope.getFuncionariosList();
				          	messageHandlerService.notifySuccess(null, result.message)
				          	//$scope.inputFuncionario = {};
				        }
				        else{
				          	messageHandlerService.notifyError(null, result.message);
				        }
			  		});
		  		//}
		  		//else{
		  			//var message = 'Debe completar la información personal de manera correcta';
					//messageHandlerService.notifyError(null, message);
		  		//}
			};

			$scope.updateFuncionarioTitulos = function (pIsValid,tituloToUpdate) {
				//if (pIsValid && tituloToUpdate.grado != "") {
			  		tituloToUpdate.idFuncionario = $scope.funcionario.id;
			  		tituloToUpdate.usuario = $scope.user.usuario;
			  		academicService.editAcademicDegree(tituloToUpdate).then(function(result) {
			  			if (result.success){
				        	//$scope.getFuncionariosList();
				          	messageHandlerService.notifySuccess(null, result.message)
				          	//$scope.inputFuncionario.infoAcademica = {};
							$scope.refrescarVistaTitulo();
				        }
				        else{
				          	messageHandlerService.notifyError(null, result.message);
				        }
			  		});
		  		//}
				//else{
		  			//var message = 'Debe completar todos los campos de la información académica de manera correcta';
					//messageHandlerService.notifyError(null, message);
		  		//}
			};

			$scope.updateFuncionarioAntecedentes = function (pIsValid,antecedenteToUpdate) {
				//if (pIsValid) {
			  		antecedenteToUpdate.usuario = $scope.user.usuario;
			  		antecedenteToUpdate.idFuncionario = $scope.funcionario.id;
			  		recordService.editRecordInfo(antecedenteToUpdate).then(function(result) {
			  			if (result.success){
				        	//$scope.getFuncionariosList();
				          	messageHandlerService.notifySuccess(null, result.message)
				          	//$scope.inputFuncionario.infoAcademica = {};
				          	$scope.refrescarVistaAntecedente();
				        }
				        else{
				          	messageHandlerService.notifyError(null, result.message);
				        }
			  		});
		  		//}
		  		//else{
		  			//var message = 'Debe completar la información de antecedentes de manera correcta';
					//messageHandlerService.notifyError(null, message);
		  		//}
			};


	    	$scope.sendToFuncionariosView = function() {
	    		$state.go('gestionar-funcionarios');
			};

			var getFuncionarioId = function() {
                $scope.funcionario.id = shareFuncionarioService.getFuncionarioId();
            };

            $scope.getUser = function() {
	    		$scope.user = shareSessionService.getSession();
	    	};

	    	$scope.getUser();
	    	getFuncionarioId();
	    	getFuncionariosList();
			getFuncionario($scope.funcionario.id);
			getAcademicInfo($scope.funcionario.id); 
			getRecords($scope.funcionario.id);
			
		}]);	
})();