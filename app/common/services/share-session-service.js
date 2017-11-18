
/**
 * @ngdoc Service
 * @author Luis Javier Ramírez Torres
 * @name shareSessionService
 * @description
 * #  service for share information between controllers
 */
(function(){
    'use strict';
    angular
        .module('saaApp') 
        .service('shareSessionService', function() {

            var setCurrentSession = function(pData) {
                var sessionData = JSON.stringify(pData);
                sessionStorage.setItem('user', sessionData);
            };

            var getCurrentSession = function() {
                var dataSession = JSON.parse(sessionStorage.getItem('user'));
                return dataSession;
            };

            var deleteCurrentSession = function() {
                sessionStorage.removeItem('user');
            };

            var getSessionStatus = function() {
                if(sessionStorage.getItem('user')) {
                    return true;
                }
                else {
                    return false;
                }
            };
       
            return {
                    setSession: function(pData) {
                        return setCurrentSession(pData);             
                    },
                    getSession: function() {
                        return getCurrentSession();
                    },
                    deleteSession: function() {
                        return deleteCurrentSession();
                    },
                    isStartSession: function() {
                        return getSessionStatus();
                    }
            };
        });
})();