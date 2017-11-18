/**
 * @ngdoc Service
 * @author Jose Alberto Hidalgo Bonilla
 * @name AssignmentModalService
 * @description
 * #  service to show plaza dependencia assignment modals
 */
(function(){
    'use strict';
    angular
        .module('saaApp') 
        .service('AssignmentModalService', function() {

            var plaza = {};
            var dependencia = {};

            var setPlaza = function(_plaza) {
                plaza = _plaza;
            };

            var getPlaza = function() {
                return plaza;
            };

            var setDependencia = function(_dependencia) {
                dependencia = _dependencia;
            };

            var getDependencia = function() {
                return dependencia;
            };
           
            return  {
                setPlaza: function(plaza) {
                    setPlaza(plaza); 
                },
                getPlaza: function() {
                    return plaza;
                },
                setDependencia: function(dependencia) {
                    setDependencia(dependencia); 
                },
                getDependencia: function() {
                    return dependencia;
                }
            };
        });
})();