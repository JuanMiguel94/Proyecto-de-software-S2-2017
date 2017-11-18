(function() {
	"use strict";
	angular
		.module("saaApp")
		.controller("PasswordCtrl", ["$scope", "PasswordService", "shareSessionService", "messageHandlerService", function($scope, passwordService, shareSessionService, messageHandlerService) {
			$scope.inputUser = {};
			$scope.updatePassword = function(inputUser) {
				passwordService.changePassword(inputUser).then(function(result) {
					if(result.success) {
						messageHandlerService.notifySuccess(null, result.message)
					}
					else{
           				messageHandlerService.notifyError(null, result.message)
					}
				});
			};

			$scope.getUser = function() {
				$scope.inputUser.usuario = shareSessionService.getSession().usuario;
			};

			$scope.getUser();
		}]);
})();