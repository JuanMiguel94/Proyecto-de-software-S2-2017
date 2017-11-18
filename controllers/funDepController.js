var funDepService = require('../businessLogic/funDepService');


exports.assignFunDep = function(dRequest, dResponse) {
    var data = funDepService.assignFunDep(dRequest.body, function(data){
        dResponse.send(data);
    });
};

exports.getFuncionariosPerDependency = function(dRequest, dResponse) {
    var data = funDepService.getFuncionariosPerDependency(dRequest.params, function(data){
        dResponse.send(data);
    });
};
