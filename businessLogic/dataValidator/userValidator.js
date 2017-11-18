/*
 *Tecnologico de Costa Rica
 *Proyecto de Ingenieria de Software
 *Luis Javier Ramírez Torres
 *Sistema de apoyo administrativo
 *Validador de datos de usuarios
*/
exports.validateDates = function(startDate, endDate) {
    var response = {};
    if(startDate <= endDate){
        response.success = true;
    }else{
        response.success = false;
        response.message = "La fecha final no puede ser mayor a la fecha de registro";
    }
    return response;
};

exports.validateData = function(user){
	var informationStatus = {};
	if(user.usuario == undefined || user.usuario == "undefined" || user.usuario.replace(" ", "").length == 0) {
		informationStatus.success = false;
		informationStatus.message = 'Usuario inválido';
	}
	else if (user.nombre == undefined || user.nombre == "undefined" || user.nombre.replace(" ", "").length == 0){
		informationStatus.success = false;
		informationStatus.message = 'Nombre inválido';
	}
	else if (user.cedula == undefined || user.cedula == "undefined" || user.cedula.replace(" ", "").length == 0){
		informationStatus.success = false;
		informationStatus.message = 'Cédula inválida';
	}
	else if (user.correo == undefined || user.nombre == "undefined" || user.correo.replace(" ", "").length == 0){
		informationStatus.success = false;
		informationStatus.message = 'Correo inválido';
	}
	else if (user.tipo == undefined || user.tipo == "undefined" || user.tipo.replace(" ", "").length == 0){
		informationStatus.success = false;
		informationStatus.message = 'Tipo inválido';
	}
	else {
		informationStatus.success = true;
	}
	return informationStatus;
}

exports.validatePasswords = function(currentPassword, password1, password2) {
	var response = {};
	if(currentPassword == undefined || currentPassword == "undefined" || currentPassword == "") {
		response.success = false;
		response.message = "El campo de la contraseña actual está en blanco";
	}
	else if(password1 == undefined || password1 == "undefined" || password1 == ""){
		response.success = false;
		response.message = "El campo de la nueva contraseña está en blanco";
	}
	else if(password2 == undefined || password2 == "undefined" || password2 == "") {
		response.success = false;
		response.message = "El campo de confirmar la nueva contraseña está en blanco";
	}
	else if (password1 != password2) {
		response.success = false;
		response.message = "Las nuevas contraseñas no coinciden";
	}
	else {
		response.success = true;
	}
	return response;
};