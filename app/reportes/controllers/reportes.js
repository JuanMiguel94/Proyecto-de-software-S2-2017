(function(){
	'use strict';
	angular
		.module('saaApp')
	    .controller('ReportesCtrl', ['$scope', 'sheetService',
	    function($scope, sheetService){
			$scope.progreso = "0%"
			
			var soc = sheetService.getSocket()
			soc.on('loop-iteration', function(progress){					
				$scope.progreso = `${Math.round(progress)}%`
				$scope.$digest()										
			})  			

			$scope.$watch("fileread", function(newValue, oldValue) {
				if(newValue){
					const data = {
						user: JSON.parse(sessionStorage.getItem('user')).usuario,
						file: newValue
					}																
					sheetService.updateDatabaseFeed(data)					
				}						  
					
			})
		}])
	}
)()
