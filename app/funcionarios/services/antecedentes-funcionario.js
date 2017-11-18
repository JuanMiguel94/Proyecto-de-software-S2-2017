 /**
 * @ngdoc Service
 * @author Jose Alberto Hidalgo Bonilla
 * @name recordService
 * @description
 * #  service para datos de antecedentes
 */
(function(){
    'use strict';
    angular
        .module('saaApp') 
        .factory('recordService', [
            'requestService',
            function(requestService) {
                var createRecordInfo = function(pData) {
                    var link = '/funcionarios/records';             
                    return  requestService.postRequest({data: pData, params: ""}, {url: link}).then(function(pResp) {
                        return pResp;
                    },
                    function(pResp){
                        return pResp;
                    });
                };

                var updateRecordInfo = function(pData) {
                    var link = '/funcionarios/records/';             
                    return  requestService.putRequest({data: pData, params: pData.id}, {url: link}).then(function(pResp) {
                        return pResp;
                    },
                    function(pResp){
                        return pResp;
                    });
                };

                var getRecordsById = function(pId) {
                    var link = '/funcionarios/records/';
                    
                    return  requestService.getRequest({params: pId}, {url: link}).then(function(pResp) {//corregir como se envian los datos
                        return pResp; 
                    },  
                    function(pResp){
                        return pResp;   
                    });
                };
           
                return {
                    newRecordInfoFuncionario: function(pData) {
                        return createRecordInfo(pData);
                    },
                    getRecordFuncionarioList: function(pId) {
                        return getRecordsById(pId);
                    },
                    editRecordInfo: function(pData){
                        return updateRecordInfo(pData);
                    }
                };
        }]);
})();