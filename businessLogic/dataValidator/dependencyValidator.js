exports.validateDependencyName = function(name) {
	var informationStatus = {};
	if(name == undefined || name == "undefined") {
		informationStatus.success = false;
		informationStatus.message = 'Nombre inválido';
	}
	else if(name.replace(" ", "").length == 0 ) {
		informationStatus.success = false;
		informationStatus.message = 'Nombre inválido';
	}
	else {
		informationStatus.success = true;
	}
	return informationStatus;
};


exports.validateDependencyCode = function(code) {
	var informationStatus = {};
	if(code == undefined || code == "undefined") {
		informationStatus.success = false;
		informationStatus.message = 'Código inválido';
	}
	else if(code.replace(" ", "").length == 0 ) {
		informationStatus.success = false;
		informationStatus.message = 'Código inválido';
	}
	else {
		informationStatus.success = true;
	}
	return informationStatus;
};