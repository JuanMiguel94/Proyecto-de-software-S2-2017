/**
 * @ngdoc Service
 * @author Jose Alberto Hidalgo Bonilla
 * @name sharePlazaService
 * @description
 * #  service for share information between controllers
 */
(function(){
    'use strict';
    angular
        .module('saaApp')
        .service('sharePlazaService', function() {

            var plazaData = {
                currentPlazaId: -1
            };

            var setId = function(pId) {
                plazaData.currentPlazaId = pId;
            };

            var getId = function() {
                return  plazaData.currentPlazaId;
            };

            return  {
                setPlazaId: function(pId) {
                    return setId(pId);
                },
                getPlazaId: function() {
                    return getId();
                }
            };
        });
})();
