
/**
 * @ngdoc Controller
 * @author Jose Hidalgo Bonilla
 * @name LoginCtrl
 * @description
 * #controller para login
 */
(function(){
	'use strict';
	angular
		.module('saaApp')
	    .controller('LoginCtrl', ['$scope', '$state', 'LoginService', 'shareSessionService', 'messageHandlerService',
	    function($scope, $state, loginService, shareSessionService, messageHandlerService){
			$scope.userData = {
				userName: '',
				password: ''
			};

			var sendToHome = function() {
				$state.go('saa');
			};

			var welcomeMessage = function() {
                var message = 'Bienvenido al Sistema de Apoyo Administrativo';
                messageHandlerService.notifySuccess(null, message);

            };

			$scope.login = function(pData) {
				loginService.logIn(pData).then(function(result) {
					if(result.success) {
						shareSessionService.setSession(result.data);
						welcomeMessage();
				        sendToHome();
					}
					else {
						messageHandlerService.notifyWarning(null, result.message);
					}
				});
			};

		}]);
})();
