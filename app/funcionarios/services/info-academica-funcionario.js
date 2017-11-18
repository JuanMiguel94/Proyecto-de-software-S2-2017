/**
 * @ngdoc Service
 * @author Jose Alberto Hidalgo Bonilla
 * @name professorService
 * @description
 * #  service para datos academicos
 */
(function(){
    'use strict';
    angular
        .module('saaApp') 
        .factory('academicService', [
            'requestService',
            function(requestService) {
                var createAcademicDegree = function(pData) {
                    var link = '/funcionarios/academics';                 
                    return  requestService.postRequest({data: pData, params: ""}, {url: link}).then(function(pResp) {
                                return pResp;
                            },
                            function(pResp){
                                return pResp;
                            });
                };

                var updateAcademicDegree = function(pData) {
                    var link = '/funcionarios/academics/';                 
                    return  requestService.putRequest({data: pData, params: pData.id}, {url: link}).then(function(pResp) {
                                return pResp;
                            },
                            function(pResp){
                                return pResp;
                            });
                };



                var getAcademicFuncionarioInfoById = function(pId) {
                    var link = '/funcionarios/academics/';
                    
                    return  requestService.getRequest({params: pId}, {url: link}).then(function(pResp) {//corregir como se envian los datos
                        return pResp; 
                    },  
                    function(pResp){
                        return pResp;   
                    });
                };
           
                return {
                    newAcademicFuncionarioInfo: function(pData) {
                        return createAcademicDegree(pData);
                    },
                    getAcademicFuncionarioInfo: function(pId) {
                        return getAcademicFuncionarioInfoById(pId);
                    },
                    editAcademicDegree: function(pData){
                        return updateAcademicDegree(pData);
                    }
                };
        }]);
})();