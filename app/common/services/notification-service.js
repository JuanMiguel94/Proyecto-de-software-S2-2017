angular.module('saaApp').factory('notificationService', function (Notification) {

  return {
    /*Los mensajes también pueden terner formato HTML
    * por ejemplo:
    * {message: '<b>Error</b> <s>notification</s>', title: '<i>Html</i> <u>message</u>'}
    * //Notification.success({message: 'Success notification<br>Some other <b>content</b><br><a href="https://github.com/alexcrack/angular-ui-notification">This is a link</a><br><img src="https://angularjs.org/img/AngularJS-small.png">', title: 'Html content'});
    */

    primary: function(bodyMessage) {
        Notification(bodyMessage);
    },

    error: function(bodyMessage) {
        Notification.error(bodyMessage);
    },

    success: function(bodyMessage) {
        Notification.success(bodyMessage);
    },

    info: function(bodyMessage) {
        Notification.info(bodyMessage);
    },

    warning: function(bodyMessage) {
        Notification.warning(bodyMessage);
    }
  };
});
