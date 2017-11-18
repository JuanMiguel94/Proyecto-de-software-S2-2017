 /*
 * @ngdoc Controller
 * @author Jose Alberto Hidalgo Bonilla
 * @name VerFuncionarioCtrl
 * @description
 * #  controller para ver la informacion de un funcionario
 */ 
(function(){
	'use strict';
	angular
		.module('saaApp')
	    .controller('VerFuncionarioCtrl', ['$scope', '$state', 'funcionarioService', 'academicService', 'recordService', 'shareFuncionarioService', 'messageHandlerService', 
	    function($scope, $state, funcionarioService, academicService, recordService, shareFuncionarioService, messageHandlerService) {

	    	$scope.funcionario = {};

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

	    	$scope.sendToFuncionariosView = function() {
	    		$state.go('gestionar-funcionarios');
			};

			var getFuncionarioId = function() {
                $scope.funcionario.id = shareFuncionarioService.getFuncionarioId();
            };

            getFuncionarioId();
			getFuncionario($scope.funcionario.id);
			getAcademicInfo($scope.funcionario.id); 
			getRecords($scope.funcionario.id); 
		}]);	
})();