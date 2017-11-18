 /**
 * @ngdoc Service
 * @author Luis Javier Ramírez Torres
 * @name User's service
 * @description
 * #  service para datos del usuario
 */
(function(){
    'use strict';
    angular
        .module('saaApp') 
        .factory('userService', [
            'requestService',
            function(requestService) {

                var getAllUsers = function() {
                    var link = '/users';
                    
                    return requestService.getRequest({params: ""}, {url: link}).then(function(pResp) {
                                return pResp;
                            },
                            function(pResp){
                                return pResp;
                            });
                };

                var getAllUserByUsername = function(pId) {
                    var link = 'usersByUsername/';
                    
                    return requestService.getRequest({params: pId}, {url: link}).then(function(pResp) {
                                return pResp;
                            },
                            function(pResp){
                                return pResp;
                            });
                };
           
                return {
                    getUserList: function() {
                        return getAllUsers();
                    },
                    getUserListByUsername: function(pId) {
                        return getAllUserByUsername(pId);
                    }
                };
        }]);
})();