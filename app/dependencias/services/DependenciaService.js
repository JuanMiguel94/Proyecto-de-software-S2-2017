(function(){
	'use strict';
	angular
		.module("saaApp")
		.factory("DependenciaService", ["requestService", function(requestService) {
			var getDepen = function() {
				var link = "/dependencies";
				return requestService.getRequest({params: ""}, {url: link}).then(function(result){
	  				return result;
	  			},
	  			function(result){
	  				return result;
	  			});
			};

			var addDepen = function(pData) {
				var link = "/dependencies";
				return requestService.postRequest({params: "", data: pData}, {url: link}).then(function(result){
	  				return result;
	  			},
	  			function(result){
	  				return result;
	  			});
			};

			var editDepen = function(pData) {
				var link = "/dependencies/";
				return requestService.putRequest({params: pData.idDependencia, data: pData}, {url: link}).then(function(result){
	  				return result;
	  			},
	  			function(result){
	  				return result;
	  			});
			};

			var delDepen = function(pData){
				var link = "/dependencies/disable/";
				return requestService.putRequest({params: pData.idDependencia, data: pData}, {url: link}).then(function(result){
	  				return result;
	  			},
	  			function(result){
	  				return result;
	  			});
			};

			return {
				getDependencies: function() {
					return getDepen();
				},
				addDependency: function(pData) {
					return addDepen(pData); 
				},
				editDependency: function(pData) {
					return editDepen(pData);
				},
				disableDependency: function(pData){
					return delDepen(pData);
				}
			}
		}]);
})();