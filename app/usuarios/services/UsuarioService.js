(function(){
	'use strict';
	angular
		.module("saaApp")
		.factory("UsuarioService", ["requestService", function(requestService) {
			var getU = function() {
				var link = "/users";
				return requestService.getRequest({params: ""}, {url: link}).then(function(result){
	  				return result;
	  			},
	  			function(result){
	  				return result;
	  			});
			};

			var addU = function(pData) {
				var link = "/users";
				return requestService.postRequest({params: "", data: pData}, {url: link}).then(function(result){
	  				return result;
	  			},
	  			function(result){
	  				return result;
	  			});
			};

			var editU = function(pData) {
				var link = "/users/";
				return requestService.putRequest({params: pData.usuario, data: pData}, {url: link}).then(function(result){
	  				return result;
	  			},
	  			function(result){
	  				return result;
	  			});
			};

			var delU = function(pData){
				var link = "/users/disable/";
				return requestService.putRequest({params: pData.usuario, data: pData}, {url: link}).then(function(result){
	  				return result;
	  			},
	  			function(result){
	  				return result;
	  			});
			};

			return {
				getUsers: function() {
					return getU();
				},
				addUser: function(pData) {
					return addU(pData); 
				},
				editUser: function(pData) {
					return editU(pData);
				},
				disableUser: function(pData){
					return delU(pData);
				}
			};
		}]);
})();