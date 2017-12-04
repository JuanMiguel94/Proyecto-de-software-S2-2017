(function(){
    'use strict';
        angular.module('saaApp').service('sheetService', ["requestService" ,function(requestService,) {
                var socket = io.connect('http://localhost:8080', {'forceNew': true});
                
                var processCompletion = 0                

                var updateDatabaseFeed = (data) => {
                    socket.emit('database-feed', data);
                }

        
                return {                        
                        updateDatabaseFeed: data => updateDatabaseFeed(data),
                        processCompletion: { progress: processCompletion },
                        getSocket: () => socket
                };
            }]);
    })();
    