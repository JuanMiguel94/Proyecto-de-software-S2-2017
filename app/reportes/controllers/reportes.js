(function(){
	'use strict';
	angular
		.module('saaApp')
	    .controller('ReportesCtrl', ['$scope',
	    function($scope){			
			$scope.$watch("fileread", function(newValue, oldValue) {
				if(newValue){
					console.log('new value')
				}						  
					
			})
		}])
	}
)()
