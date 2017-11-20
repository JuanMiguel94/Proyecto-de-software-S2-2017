(function(){
	'use strict';
	angular
		.module('saaApp')
	    .controller('ReportesCtrl', ['$scope', 'sheetService',
	    function($scope, sheetService){
			$scope.$watch("fileread", function(newValue, oldValue) {
				if(newValue){				
					sheetService.updateDatabaseFeed(newValue)
					console.log('new value')
				}						  
					
			})
		}])
	}
)()
