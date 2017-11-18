 /**
 * @ngdoc Service
 * @author Jose Alberto Hidalgo Bonilla
 * @name funcionarioService
 * @description
 * #  service for manage funcionario
 */
(function(){
    'use strict';
    angular
        .module('saaApp') 
        .factory('funcionarioService', [
            'requestService',
            function(requestService) {
                var createFuncionario = function(pData) {
                    var link = '/funcionarios';                  
                    return  requestService.postRequest({data: pData, params: ""}, {url: link}).then(function(pResp) {
                        return pResp;
                    },
                    function(pResp){
                        return pResp;
                    });
                };

                var updateFuncionario = function(pData) {
                    var link = '/funcionarios/';                  
                    return  requestService.putRequest({data: pData, params: pData.id}, {url: link}).then(function(pResp) {
                        return pResp;
                    },
                    function(pResp){
                        return pResp;
                    });
                };

                var getAllFuncionarios = function(pData) {
                    var link = '/funcionarios';           
                    return requestService.getRequest({params: ""}, {url: link}).then(function(pResp) {
                        return pResp;
                    },
                    function(pResp){
                        return pResp;
                    });
                };

                var getFuncionarioById = function(pId) {
                    var link = '/funcionarios/';
                    
                    return  requestService.getRequest({params: pId}, {url: link}).then(function(pResp) {
                        return pResp; 
                    },  
                    function(pResp){
                        return pResp;   
                    });
                };
                
                var desactivateFuncionario = function(pData) {
                    var link = '/funcionarios/disable/';                  
                    return  requestService.putRequest({data: pData, params: pData.funcionarioId}, {url: link}).then(function(pResp) {
                        return pResp;
                    },
                    function(pResp){
                        return pResp;
                    });
                };

                return {
                    newFuncionario: function(pData) {
                        return createFuncionario(pData);
                    },
                    getFuncionarioList: function() {
                        return getAllFuncionarios();
                    },
                    getFuncionario: function(pId) {
                        return getFuncionarioById(pId);
                    },
                    editFuncionario: function(pData){
                        return updateFuncionario(pData);
                    },
                    disableFuncionario: function(pData) {
                        return desactivateFuncionario(pData);
                    }
                };
        }]);
})();