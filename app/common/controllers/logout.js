/**
 * @ngdoc Controller
 * @author Alberto Hidalgo Bonilla
 * @name LoginCtrl
 * @description
 * #  controller para logout
 */ 
(function(){
	'use strict';
	angular
		.module('saaApp')
	    .controller('LogoutCtrl', ['$scope', '$state', 'shareSessionService',
	    function($scope, $state, shareSessionService){
            
            var sendToLogin = function() {
            	$state.go('login');
            };

			var logout = function() {
				shareSessionService.deleteSession();
				sendToLogin();
			};

			logout();
			
		}]);	
})();