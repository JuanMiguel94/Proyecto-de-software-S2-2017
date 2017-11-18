 /*
 * @ngdoc Controller
 * @author Jose Alberto Hidalgo Bonilla
 * @name NuevoFuncionarioCtrl
 * @description
 * #  controller para crear un nuevo funcionario
 */ 
 (function() {
 	"use strict";
 	angular
 		.module("saaApp")
 		.controller("NuevoFuncionarioCtrl", ["$scope", "$state", "messageHandlerService", "academicService", "recordService", "funcionarioService", "shareSessionService", function($scope, $state, messageHandlerService, academicService, recordService, funcionarioService, shareSessionService) {
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
	    			cedula: '',
	    			nombre: '',
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
	    		antecedente: ''
	    	};

	    	$scope.user = {};

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

		    $scope.validAcademicForm = function(pIsValid, pData) {
				if(pIsValid && pData.grado != "") { 
					addAcademicInfo(pData);
				}
				else {
					var message = 'Debe completar todos los campos de la información académica de manera correcta';
					messageHandlerService.notifyError(null, message);
				}
			};

			$scope.validRecordForm = function(pIsValid, pData) {
				if(pIsValid) { 
					addRecordInfo(pData);
				}
				else {
					var message = 'Debe completar la información de antecedentes de manera correcta';
					messageHandlerService.notifyError(null, message);
				}
			};

			$scope.validatedFuncionario = function(pIsValid, pData) {
	    		if(pIsValid) { 
					var result = completeAllFuncionarioData(pData);
		    		if(result.success) {
		    			addFuncionario(pData);
		    		}
		    		else {
		    			messageHandlerService.notifyWarning(null, result.message);
		    		}
				}
				else {
					var message = 'Debe completar la información personal de manera correcta';
					messageHandlerService.notifyError(null, message);
				}
	    	};

	    	$scope.getUser = function() {
	    		$scope.user = shareSessionService.getSession();
	    	};

			var addAcademicInfo = function(pData) {
	    		var newAcademicInfo = {
	    			titulo: pData.titulo,
	    			universidad: pData.universidad, 
	    			grado: pData.grado,
	    			annoGraduacion: pData.annoGraduacion
	    		};
	    		$scope.funcionario.infoAcademica.push(newAcademicInfo);
	    		cleanAcademicInfo();
	    	};	

	    	var cleanAcademicInfo = function() {
		    	$scope.inputFuncionario.infoAcademica.titulo = '';
	    		$scope.inputFuncionario.infoAcademica.universidad = ''; 
	    		$scope.inputFuncionario.infoAcademica.grado = '';
	    		$scope.inputFuncionario.infoAcademica.annoGraduacion = new Date(); 
		    };

		    var addRecordInfo = function(pData) {
	    	    var newRecordInfo = {
	    			descripcion: pData
	    		};
	    		$scope.funcionario.antecedentes.push(newRecordInfo);
	    		cleanRecordInfo();
	    	};	

	    	var cleanRecordInfo = function() {
		    	$scope.inputFuncionario.antecedente = '';
		    };

		    var completeAllFuncionarioData = function() {
	    		var status = {};
	    		var largoAcademica = $scope.funcionario.infoAcademica.length;
	    		var largoAntecedentes = $scope.funcionario.antecedentes.length;
	    		if((largoAcademica > 0) & (largoAntecedentes > 0)) {
	    			status.success = true;
	    		}
	    		else {
	    			status.success = false;
	    			status.message = 'Debe agregar todas las secciones de información';
	    		}
	   
	    		return status;
	    	};

	    	var addFuncionario = function(pData) {
	    		pData.infoPersonal.activo = 1;
	    		pData.infoPersonal.usuarioActual = $scope.user.usuario;
	    		funcionarioService.newFuncionario(pData.infoPersonal).then(function(result) {
					if(result.success) {
						messageHandlerService.notifySuccess(null, result.message);
						var i;
						for (i = 0; i < pData.infoAcademica.length; i++) {	
							var data = {
								id: result.data,	
								params: pData.infoAcademica[i] 
							};
							addAcademicInfoFuncionario(data);
        				}
						for (i = 0; i < pData.antecedentes.length; i++) {
							var data = {
								id: result.data,	
								params: pData.antecedentes[i] 
							};
							addRecordInfoFuncionario(data);
        				}
        				$state.go('gestionar-funcionarios');
					}
					else {
						messageHandlerService.notifyWarning(null, result.message);
					}
				});

	    	};

	    	var addAcademicInfoFuncionario = function(pData) {
	    		academicService.newAcademicFuncionarioInfo(pData).then(function(result) {
					if(!result.success) {
						messageHandlerService.notifyWarning(null, result.message);						
					}
				});

	    	};

	    	var addRecordInfoFuncionario = function(pData) {
	    		recordService.newRecordInfoFuncionario(pData).then(function(result) {
					if(!result.success) {
						messageHandlerService.notifyWarning(null, result.message);						
					}
				});

	    	};

	    	$scope.getUser();

 		}]);
 })();