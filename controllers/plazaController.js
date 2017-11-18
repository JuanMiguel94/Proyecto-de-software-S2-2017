var plazaService = require("../businessLogic/plazaService.js");

exports.addPlaza = function(pRequest, pResponse) {
	var data = plazaService.addPlaza(pRequest.body, function(data) {
        pResponse.send(data);
    });
};

exports.addPlazaInfo = function(pRequest, pResponse) {
	var data = plazaService.addPlazaInfo(pRequest.body, function(data) {
        pResponse.send(data);
    });
};

exports.updatePlaza = function(pRequest, pResponse) {
	var data = plazaService.updatePlaza(pRequest.body, function(data) {
        pResponse.send(data);
    });
};

exports.disablePlaza = function(pRequest, pResponse) {
	var data = plazaService.disablePlaza(pRequest.body, function(data) {
        pResponse.send(data);
    });
};

exports.getAllPlazas = function(pRequest, pResponse) {
	var data = plazaService.getAllPlazas(function(data) {
		pResponse.send(data);
	});
};

exports.getPlaza = function(pRequest, pResponse) {
	var data = plazaService.getPlaza(pRequest.params, function(data) {
		pResponse.send(data);
	});
};

exports.getCategorias = function(pRequest, pResponse) {
	var data = plazaService.getCategorias(function(data) {
		pResponse.send(data);
	});
};

exports.getPuestos = function(pRequest, pResponse) {
	var data = plazaService.getPuestos(function(data) {
		pResponse.send(data);
	});
};