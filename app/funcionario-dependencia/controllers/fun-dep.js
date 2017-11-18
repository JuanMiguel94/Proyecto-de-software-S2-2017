/*
 * @ngdoc Controller
 * @author Jose Alberto Hidalgo Bonilla
 * @name FunDepCtrl
 * @description
 * #  controller para asignar funcionarios a dependencias
 */ 
(function(){
	'use strict';
	angular
		.module('saaApp')
	    .controller('FunDepCtrl', ['$q' ,'$scope', '$state', 'funcionarioService', 'DependenciaService', 'FunDepService', 'shareSessionService','messageHandlerService', 
	    function($q, $scope, $state, funcionarioService, dependenciaService, funDepService, shareSessionService, messageHandlerService) {
            $scope.funcionarioList = [];
            $scope.dependenciaList = [];
            $scope.user = {};
            $scope.selectedDependency = "";
            $scope.mdlTag = "";
			$scope.filters = 0; 

            $scope.getFuncionarios = function(pData) {
                var idD = pData.split("-")[0];
                funDepService.getFuncionariosPorDependencia(idD).then(function(result) {
                    if(result.success) {
                        $scope.funcionarioList = result.data;
                    }
                    else{
                        messageHandlerService.notifyWarning(null, result.message);
                    }
                });
            };
            $scope.getDependencies = function() {
                dependenciaService.getDependencies().then(function(result) {
                    if(result.success) {
                        $scope.dependenciaList = result.data;
                        if($scope.dependenciaList.length > 0){
                            $scope.selectedDependency = $scope.dependenciaList[0].id + " - " + $scope.dependenciaList[0].nombre;
                            $scope.getFuncionarios($scope.selectedDependency);
                        }
                    }
                    else{
                        messageHandlerService.notifyWarning(null, result.message);                        
                    }
                });
            };
            $scope.assign = function(funcionarios, idD) {
                var id = idD.split("-")[0];
                var error;
                for(var i=0; i<funcionarios.length; i++) {
                    if(funcionarios[i].selected != undefined && funcionarios[i].selected == true){
                        var data = {usuario: $scope.user.usuario, idFuncionario: funcionarios[i].id, idDependencia: id};
                        funDepService.assign(data).then(function(result) {
                            if(!result.success){
                                error = result.message;
                            }
                        });
                    }
                }
                $q.all(funcionarios).then(function(arrayOfResults) { 
                    if(error) {
                        messageHandlerService.notifyError(null, error);                                        
                    }
                    else{
                        var listOfId = [];
                        for(var i=0; i<$scope.funcionarioList.length; i++) {
                            if($scope.funcionarioList[i].selected != undefined && $scope.funcionarioList[i].selected == true) {
                                listOfId.push($scope.funcionarioList[i].id);
                            }
                        }
                        for(var i=0; i<listOfId.length; i++) {
                            cleanSelected(listOfId[i]);
                        }
                        messageHandlerService.notifySuccess(null, "Las asignaciones se realizaron correctamente");
                    }
                });
            };

            var cleanSelected = function(id) {
                $scope.funcionarioList = $scope.funcionarioList.filter(function(value) {
                    return id != value.id;
                });
            };
           
            $scope.checkFunc = function(func){
                func.selected = !func.selected;
                if(func.selected){
                    document.getElementById(func.id.toString()).className = "glyphicon glyphicon-ok";
                }
                else{
                    document.getElementById(func.id.toString()).className = "";
                }
            };

            $scope.getUser = function() {
                $scope.user = shareSessionService.getSession();
            };
    
            $scope.getUser();
            $scope.getDependencies();
		}]);	
})();