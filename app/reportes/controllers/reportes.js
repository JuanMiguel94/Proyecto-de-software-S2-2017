(function(){
	'use strict';
	angular
		.module('saaApp')
	    .controller('ReportesCtrl', ['$scope', 'sheetService',
	    function($scope, sheetService){
			$scope.$watch("fileread", function(newValue, oldValue) {
				if(newValue){
					data = {
						user: sessionStorage.getItem('user'),
						file: newValue
					}				
					sheetService.updateDatabaseFeed(data)
					console.log('new value')
				}						  
					
			})
		}])
	}
)()
