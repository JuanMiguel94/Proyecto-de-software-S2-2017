var dependencyService = require('../businessLogic/dependencyService');


exports.getAllDependencies = function(dRequest, dResponse) {
    var data = dependencyService.allDependencies(function(data){
        dResponse.send(data);
    });
};

exports.getDependencyById = function(dRequest, dResponse) {
    var data = dependencyService.dependencyById(dRequest.params, function(data){
        dResponse.send(data);
    });
};

exports.addDependency= function(dRequest, dResponse) {
    var data = dependencyService.addDependency(dRequest.body, function(data) {
    	dResponse.send(data);
    });
};

exports.updateDependency= function(dRequest, dResponse) {
    var data = dependencyService.updateDependency(dRequest.body, function(data) {
    	dResponse.send(data);
    });
};

exports.disableDependency= function(dRequest, dResponse) {
    var data = dependencyService.disableDependency(dRequest.body, function(data) {
        dResponse.send(data);
    });
};