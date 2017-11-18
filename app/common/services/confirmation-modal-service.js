/**
 * @ngdoc Service
 * @author Jose Alberto Hidalgo Bonilla
 * @name confirmationModalService
 * @description
 * #  service to show confirmation modals
 */
(function(){
    'use strict';
    angular
        .module('saaApp') 
        .service('confirmationModalService', function() {

            var modalContent = {};

            var setTitle = function(mTitle) {
                modalContent.title = mTitle;
            };

            var getTitle = function() {
                return modalContent.title;
            };

            var setMessage = function(mMessage) {
                modalContent.message = mMessage;
            };

            var getMessage = function() {
                return modalContent.message;
            };
           
            return  {
                setModalContent: function(mTitle, mMessage) {
                    setTitle(mTitle);   
                    setMessage(mMessage);
                },
                getModalContent: function() {
                    return modalContent;
                }
            };
        });
})();