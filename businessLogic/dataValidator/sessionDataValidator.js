/*
 *Tecnologico de Costa Rica
 *Proyecto de ingenieria de software
 *Luis Javier Ramirez Torres
 *Sistema de apoyo administrativo
 *Validador de datos de usuario
*/

exports.validSessionData = function(pData) {
	var informationStatus = {};

	if((pData.userName !== '') & (pData.password !== '')) {
		informationStatus.success = true;
	}
	else {
		informationStatus.success = false;
		informationStatus.message = 'Datos incorrectos, por favor complete todos los campos';
	}
	return informationStatus;
};