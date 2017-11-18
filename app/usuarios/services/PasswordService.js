(function() {
	"use strict";
	angular
		.module("saaApp")
		.factory("PasswordService", ["requestService", function(requestService) {
			var change = function(pData) {
				var link = "/changePassword/";
				return requestService.putRequest({params: pData.usuario, data: pData}, {url: link}).then(function(result) {
					return result;
				},
				function(result) {
					return result;
				});
			};

			return {
				changePassword: function(pData) {
					return change(pData);
				}
			};
		}]);
})();