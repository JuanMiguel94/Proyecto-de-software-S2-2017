
/*
 *Tecnologico de Costa Rica
 *Proyecto de ingenieria de software
 *Jose Hidalgo Bonilla
 *Sistema de apoyo administrativo
 *Controlador de sesion
*/
var sessionService   = require('../businessLogic/sessionService.js'),
    sessionValidator = require('../businessLogic/dataValidator/sessionDataValidator.js');

exports.login = function(pRequest, pResponse) {
	var validInformation = sessionValidator.validSessionData(pRequest.body);
    var sessionResponse = {};

    if(validInformation.success) {
        sessionService.validateUser(pRequest.body, function(result) {
            sessionResponse.success = result.status;
            sessionResponse.message = result.message;
            sessionResponse.data = result.data;
            pResponse.status(200);
            pResponse.send(sessionResponse);
        });
    }
    else {
        sessionResponse.success = false;
        sessionResponse.message = validInformation.message;
        pResponse.status(200);
        pResponse.send(sessionResponse);
    }    
};