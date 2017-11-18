
angular.module('saaApp').factory('messageHandlerService', function (notificationService){

  return {
    notifyError: function(title, message) {
        var delay;
        delay = 7000;
        notificationService.error({message: message, title: title, delay: delay}); 
    },

    notifySuccess: function(title, message){
        var delay = 7000;
        notificationService.success({message: message, title: title, delay: delay}); 
    },

    notifyInfo: function(title, message){
        var delay = 7000;
        notificationService.info({message: message, title: title, delay: delay}); 
    },

    notifyWarning: function(title, message){
        var delay = 7000;
        notificationService.warning({message: message, title: title, delay: delay}); 
    }

  };
});