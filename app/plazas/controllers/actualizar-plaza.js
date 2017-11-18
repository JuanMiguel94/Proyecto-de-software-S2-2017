(function() {
	"use strict";
	angular
		.module("saaApp")
		.controller("ActualizarPlazaCtrl", ["$scope", "PlazaService", "messageHandlerService","shareSessionService","sharePlazaService", function($scope, plazaService, messageHandlerService,shareSessionService,sharePlazaService) {
			$scope.plaza = {};
			$scope.user = {};
			
			$scope.dateSettings = {
	    		dateFormat:'dd-MM-yyyy',
                showRegDate: false,
                showEndDate: false,
                showAgreDate: false
	    	}; 

			$scope.puesto = {};
	    	$scope.puestoList = [];
	    	$scope.categoria= undefined;
			$scope.plaza.fechaAutorizacionInicio = new Date();
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

	    	var getPlaza = function(pId) {
				plazaService.getPlaza(pId).then(function(result) {
					if(result.success) {
						$scope.plaza = result.data;
						$scope.plaza.programa = $scope.plaza.programa + '';
						$scope.plaza.activo = $scope.plaza.activo.data[0];
						$scope.categoria = $scope.plaza.categoria;
					}
					else {
						messageHandlerService.notifyError(null, result.message);
					}
				});
			};

			var getPlazaId = function() {
                $scope.plaza.id = sharePlazaService.getPlazaId();
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
				var plazaInfo = {
					id: pData.id,
					idcp: pData.idcp,
					usuarioActual: $scope.user.usuario,
					descripcion: pData.descripcion,
					codigo: pData.codigo,
					periodo: pData.periodo,
					programa: parseInt(pData.programa),
					categoria: parseInt(pData.categoria),
					tipo: pData.tipo,
					puesto: pData.puesto,
					idPuesto: pData.idPuesto,
					jornada: pData.jornada,
					fechaAutorizacionInicio: pData.fechaAutorizacionInicio,
					fechaAutorizacionFinal: pData.fechaAutorizacionFinal,
					articulo: pData.articulo,
					numeroSesion: pData.numeroSesion,
					fechaAcuerdo: pData.fechaAcuerdo,
					tce: pData.tce,
					fechaRegistro: pData.fechaRegistro,
					activo: pData.activo,
				};
				plazaService.updatePlaza(plazaInfo).then(function(result) {
					if(result.success) {
						messageHandlerService.notifySuccess(null, result.message);
						$scope.plaza = plazaInfo;
						$scope.plaza.programa = $scope.plaza.programa + '';
						$scope.plaza.idcp = result.data;
					}
					else{
						messageHandlerService.notifyError(null, result.message);
					}
				});
		    };

		    $scope.getPuestosPlaza = function() {
		    	plazaService.getPuestos().then(function(result) {
		    		if(result.success) {
		    			$scope.puestoList = result.data;
		    		}
		    	});
		    };

			$scope.setCategoria = function(puesto){
				for(var i=0; i<$scope.puestoList.length; i++) {
					if($scope.puestoList[i].puesto == puesto) {
						$scope.plaza.idPuesto = $scope.puestoList[i].id;
						$scope.plaza.categoria = $scope.puestoList[i].categoria;
						break;
					}
				}
			};

		    $scope.getPuestosPlaza();
		    $scope.getUser();
		    getPlazaId();
			getPlaza($scope.plaza.id);
		}]);
})();