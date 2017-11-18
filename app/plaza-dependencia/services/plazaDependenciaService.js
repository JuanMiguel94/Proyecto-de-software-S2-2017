(function(){
	'use strict';
	angular
		.module("saaApp")
		.factory("PlazaDependenciaService", ["requestService", function(requestService) {
		
			var doAssign = function(pData) {
				var link = "/plazaDependencia";
				return requestService.postRequest({params: "", data: pData}, {url: link}).then(function(result){
	  				return result;
	  			},
	  			function(result){
	  				return result;
	  			});
			};

			var plazasPorDependencia = function(pData) {
				var link = "/plazaDependencia/";
				return requestService.getRequest({params: pData}, {url: link}).then(function(result){
	  				return result;
	  			},
	  			function(result){
	  				return result;
	  			});
			};

			return {
				assign: function(pData) {
					return doAssign(pData);
				} ,
				getPlazasPorDependencia: function(pData) {
					return plazasPorDependencia(pData);
				}
			}
		}]);
})();