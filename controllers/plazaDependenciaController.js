var plazaDependenciaService = require('../businessLogic/plazaDependenciaService');


exports.assignPlazaDependencia = function(dRequest, dResponse) {
    var data = plazaDependenciaService.assignPlazaDependencia(dRequest.body, function(data){
        dResponse.send(data);
    });
};

exports.getPlazasPerDependency = function(dRequest, dResponse) {
    var data = plazaDependenciaService.getPlazasPerDependency(dRequest.params, function(data){
        dResponse.send(data);
    });
};


/*
exports.getFuncionariosPerDependency = function(dRequest, dResponse) {
    var data = plazaDependenciaService.getFuncionariosPerDependency(dRequest.params, function(data){
        dResponse.send(data);
    });
};*/