(function() {
	"use strict";
	angular
		.module("saaApp")
		.service("PlazaService", ["requestService", function(requestService) {
			var addP = function(pData) {
				var link = "/plazas";
				return requestService.postRequest({params: "", data: pData}, {url: link}).then(function(result){
	  				return result;
	  			},
	  			function(result){
	  				return result;
	  			});
			};

			var addPI = function(pData) {
				var link = "/plazasInfo";
				return requestService.postRequest({params: "", data: pData}, {url: link}).then(function(result){
	  				return result;
	  			},
	  			function(result){
	  				return result;
	  			});
			};

			var updatePl = function(pData) {
                var link = '/plazas/';                  
                return  requestService.putRequest({data: pData, params: pData.id}, {url: link}).then(function(pResp) {
                    return pResp;
                },
                function(pResp){
                    return pResp;
                });
            };

            var disablePl = function(pData) {
				var link = '/plazas/disable/';                  
				return  requestService.putRequest({data: pData, params: pData.id}, {url: link}).then(function(pResp) {
					return pResp;
				},
				function(pResp){
					return pResp;
				});
			};


			var getAllPlazas = function(pData) {
                var link = '/plazas';           
                return requestService.getRequest({params: ""}, {url: link}).then(function(pResp) {
                    return pResp;
                },
                function(pResp){
                    return pResp;
                });
            };

            var getPlazaById = function(pId) {
                var link = '/plazas/';
                return  requestService.getRequest({params: pId}, {url: link}).then(function(pResp) {
                    return pResp; 
                },  
                function(pResp){
                    return pResp;   
                });
            };

            var categorias = function(){
            	var link = "/plazaCategorias";
            	return requestService.getRequest({params: ""}, {url: link}).then(function(pResp) {
            		return pResp;
            	},
            	function(pResp) {
            		return pResp;
            	});
            };

            var puestos = function(){
            	var link = "/plazaPuestos";
            	return requestService.getRequest({params: ""}, {url: link}).then(function(pResp) {
            		return pResp;
            	},
            	function(pResp) {
            		return pResp;
            	});
            };


			return {
				addPlaza: function(pData) {
					return addP(pData);
				},
				addPlazaInfo: function(pData) {
					return addPI(pData);
				},
				getPlazaList: function() {
					return getAllPlazas();
				},
				getPlaza: function(pData) {
					return getPlazaById(pData);
				},
				updatePlaza: function(pData){
					return updatePl(pData);
				},
				getCategorias: function() {
					return categorias();
				},
				getPuestos: function() {
					return puestos();
				},
				disablePlaza: function(pData){
					return disablePl(pData);
				}
			};
		}]);
})();