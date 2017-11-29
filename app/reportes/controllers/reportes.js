(function(){
	'use strict';
	angular
		.module('saaApp')
	    .controller('ReportesCtrl', ['$scope', 'sheetService',
	    function($scope, sheetService){
			$scope.$watch("fileread", function(newValue, oldValue) {
				if(newValue){
					const data = {
						user: JSON.parse(sessionStorage.getItem('user')).usuario,
						file: newValue
					}
					console.log(data.user)											
					sheetService.updateDatabaseFeed(data)
					console.log('new value')
				}						  
					
			})
		}])
	}
)()
