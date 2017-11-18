 /*
 * @ngdoc Controller
 * @author Jose Alberto Hidalgo Bonilla
 * @name VerPlazaCtrl
 * @description
 * #  controller para ver la informacion de una plaza
 */ 
(function(){
	'use strict';
	angular
		.module('saaApp')
	    .controller('VerPlazaCtrl', ['$scope', '$state', 'PlazaService', 'sharePlazaService', 'messageHandlerService', 
	    function($scope, $state, plazaService, sharePlazaService, messageHandlerService) {

	    	$scope.plaza = {};

	    	var getPlaza = function(pId) {
				plazaService.getPlaza(pId).then(function(result) {
					if(result.success) {
						$scope.plaza = result.data;
						$scope.plaza.activo = $scope.plaza.activo.data[0];
					}
					else {
						messageHandlerService.notifyError(null, result.message);
					}
				});
			};

	    	$scope.sendToPlazasView = function() {
	    		$state.go('gestionar-plazas');
			};

			var getPlazaId = function() {
                $scope.plaza.id = sharePlazaService.getPlazaId();
            };

            getPlazaId();
			getPlaza($scope.plaza.id);
		}]);	
})();