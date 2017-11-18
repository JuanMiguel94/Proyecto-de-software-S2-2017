(function() {
	"use strict";
	angular
		.module("saaApp")
		.controller("NuevaPlazaCtrl", ["$scope", "PlazaService", "messageHandlerService","shareSessionService", function($scope, plazaService, messageHandlerService,shareSessionService) {
			$scope.plaza = {};
			$scope.user = {};
			
			$scope.dateSettings = {
	    		dateFormat:'dd-MM-yyyy',
                showRegDate: false,
                showEndDate: false,
                showAgreDate: false
	    	}; 

			$scope.categoria = undefined;

	    	$scope.puestoList = [];
			$scope.plaza.fechaAutorizacionInicial = new Date();
			$scope.plaza.fechaAutorizacionFinal = new Date();
			$scope.plaza.fechaAcuerdo = new Date();
			$scope.plaza.fechaRegistro = new Date();
			$scope.plaza.activo = 1;
			$scope.typeList = ["CF", "NT", "FS", "CT"];
			$scope.progList = [1,2,3,4,5,6,7,8,9,10];

			$scope.openRegDatePickerPopUp = function() {	
		    	$scope.dateSettings.showRegDate = !$scope.dateSettings.showRegDate;
		      	return $scope.dateSettings.showRegDate;
		    };

		    $scope.openEndDatePickerPopUp = function() {	
		    	$scope.dateSettings.showEndDate = !$scope.dateSettings.showEndDate;
		      	return $scope.dateSettings.showEndDate;
		    };

		    $scope.openAgreDatePickerPopUp = function() {	
		    	$scope.dateSettings.showAgreDate = !$scope.dateSettings.showAgreDate;
		      	return $scope.dateSettings.showAgreDate;
		    };

		    $scope.getUser = function() {
	    		$scope.user = shareSessionService.getSession();
	    	};

	    	$scope.setTCE = function(){
	    		if ($scope.plaza.jornada && $scope.plaza.periodo){
	    			$scope.plaza.tce = ($scope.plaza.periodo/12) * ($scope.plaza.jornada/100);
	    		}
	    		else{
	    			$scope.plaza.tce = undefined;
	    		}
	    	};

		    $scope.validatedPlaza = function(pIsValid, pIsValid2, pIsValid3, pData) {
				pData.puesto = JSON.parse(pData.puesto);
		    	if(pIsValid && pIsValid2 && pIsValid3) {
		    		var plazaInfo = {
		    			usuarioActual: $scope.user.usuario,
			    		descripcion: pData.descripcion,
			    		codigo: pData.codigo,
			    		periodo: pData.periodo,
			    		programa: parseInt(pData.programa),
			    		categoria: parseInt($scope.categoria),
			    		tipo: pData.tipo,
			    		puesto: pData.puesto.id,
			    		jornada: pData.jornada,
			    		fechaAutorizacionInicio: pData.fechaAutorizacionInicial,
			    		fechaAutorizacionFinal: pData.fechaAutorizacionFinal,
			    		articulo: pData.articulo,
			    		numeroSesion: pData.numeroSesion,
			    		fechaAcuerdo: pData.fechaAcuerdo,
			    		tce: pData.tce
			    	};
					console.log(plazaInfo);
			    	plazaService.addPlaza(plazaInfo).then(function(result) {
			    		if(result.success) {
			    			plazaInfo.idPlaza = result.data;
							if(plazaInfo.tipo == 'CF' || plazaInfo.tipo == 'NT') {
								plazaInfo.fechaAutorizacionFinal = '';
							}
					    	plazaService.addPlazaInfo(plazaInfo).then(function(result) {
					    		if(result.success) {
					    			messageHandlerService.notifySuccess(null, result.message);
					    			$scope.plaza = {};
					    			$scope.plaza.fechaAutorizacionInicial = new Date();
									$scope.plaza.fechaAutorizacionFinal = new Date();
									$scope.plaza.fechaAcuerdo = new Date();
									$scope.plaza.fechaRegistro = new Date();
									$scope.plaza.activo = 1;
									$scope.categoria = undefined;

					    		}
					    		else{
					    			messageHandlerService.notifyError(null, result.message);
					    		}
					    	});
			    		}
			    		else{
			    			messageHandlerService.notifyError(null, result.message);
			    		}
			    	});
		    	}
		    	else{
			    	messageHandlerService.notifyWarning(null, "Debe completar todo los campos correctamente");
		    	}
		    };

		    $scope.getPuestosPlaza = function() {
		    	plazaService.getPuestos().then(function(result) {
		    		if(result.success) {
		    			$scope.puestoList = result.data;
		    		}
		    	});
		    };

			$scope.setCategoria = function(puesto){
				var puesto = JSON.parse(puesto);
				$scope.categoria = puesto.categoria;
			};

		    $scope.getPuestosPlaza();
		    $scope.getUser();
		}]);
})();