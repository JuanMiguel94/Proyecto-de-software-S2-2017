(function(){
	'use strict';
	angular
		.module('saaApp')
	    .controller('PlazaDependenciaCtrl', ['$scope',"$q", '$uibModal','$state', 'PlazaService', 'DependenciaService', 'shareSessionService','messageHandlerService', 'AssignmentModalService','PlazaDependenciaService',
	    function($scope, $q, $uibModal, $state, plazaService, dependenciaService, shareSessionService, messageHandlerService, assignmentModalService,plazaDependenciaService) {
            $scope.dependenciaList = [];
            $scope.plazaList = [];
            $scope.user = {};


            $scope.getDependencies = function() {
                var error;
                dependenciaService.getDependencies().then(function(result) {
                    if(result.success) {
                        $scope.dependenciaList = result.data;
                        $scope.getPlazasPorDependencia();
                    }
                    else{
                        messageHandlerService.notifyWarning(null, result.message);                        
                    }
                });
            };
            $scope.getPlazas = function() {
                plazaService.getPlazaList().then(function(result) {
                    if(result.success) {
                        $scope.plazaList = result.data;
                        console.log($scope.plazaList);
                    }
                    else{
                        messageHandlerService.notifyWarning(null, result.message);                        
                    }
                });
            };

            $scope.getPlazasPorDependencia = function(){
                
                for (var j = 0; j < $scope.dependenciaList.length; j++) {
                    
                    $scope.getPlazasPorDependencia2($scope.dependenciaList[j],j);
                    
                }
            }

            $scope.getPlazasPorDependencia2 = function(dependencia, contador){
                var data = {id: dependencia.id};
                plazaDependenciaService.getPlazasPorDependencia(data.id).then(function(result){
                    if(result.success){
                        $scope.dependenciaList[contador].plazas = result.data;
                    }
                    else{
                        messageHandlerService.notifyWarning(null, result.message); 
                    }
                });   
            }


            $scope.getUser = function() {
                $scope.user = shareSessionService.getSession();
            };

            $scope.dragCallback = function(event, ui, plaza) {
                assignmentModalService.setPlaza(plaza);
            };

            $scope.dropCallback = function(event, ui, dependencia) {
                assignmentModalService.setDependencia(dependencia);
                $scope.openNewAssignmentModal(function(response) {
                    if(!response.success){
                        return;
                    }
                    for (var i = 0; i < $scope.dependenciaList.length; i++) {
                        if($scope.dependenciaList[i].id == response.data.idDependencia){
                            var plazaAsignada = {
                                codigo: response.data.codigo,
                                tipo: response.data.tipo,
                                porcentajeAcordado: response.data.jornada,
                                fechaInicio: response.data.fechaInicio,
                                fechaFinal: response.data.fechaFinal
                            }
                            var flag = false;
                            for (var j = 0; j < $scope.dependenciaList[i].plazas.length; j++) {
                                if($scope.dependenciaList[i].plazas[j].codigo == response.data.codigo){
                                    if($scope.dependenciaList[i].plazas[j].fechaInicio == response.data.fechaInicio && $scope.dependenciaList[i].plazas[j].fechaFinal == response.data.fechaFinal){
                                        $scope.dependenciaList[i].plazas[j].porcentajeAcordado += response.data.jornada;
                                        flag = true;
                                        break;
                                    }
                                }
                            }

                            if (flag == false){
                                $scope.dependenciaList[i].plazas.push(plazaAsignada);
                            }
                            break;
                        }
                    }
                    
                });
            };

            $scope.openNewAssignmentModal = function (callback) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'asignacionPlazaDependenciaTemplate.html',
                    controller: 'AssignmentModalInstanceCtrl',
                    size: 'md',
                    resolve: {}
                });

                modalInstance.result.then(
                    function (confirmationResponse) { //success
                        console.log(confirmationResponse);
                        callback(confirmationResponse);
                    }, 
                    function () {
                        callback({
                            success: false,
                            data: null,
                            message: 'Se cancela la asignacion de la plaza al profesor'
                        });
                    });
            };
    
            $scope.getUser();
            $scope.getDependencies();
            $scope.getPlazas();
           

		}]);	
})();