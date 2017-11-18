/**
 * @ngdoc Service
 * @author Jose Alberto Hidalgo Bonilla
 * @name shareFuncionarioService
 * @description
 * #  service for share information between controllers
 */
(function(){
    'use strict';
    angular
        .module('saaApp')
        .service('shareFuncionarioService', function() {

            var funcionarioData = {
                currentFuncionarioId: -1
            };

            var setId = function(pId) {
                funcionarioData.currentFuncionarioId = pId;
            };

            var getId = function() {
                return  funcionarioData.currentFuncionarioId;
            };

            return  {
                setFuncionarioId: function(pId) {
                    return setId(pId);
                },
                getFuncionarioId: function() {
                    return getId();
                }
            };
        });
})();
