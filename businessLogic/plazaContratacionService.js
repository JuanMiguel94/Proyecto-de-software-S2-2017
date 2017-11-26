var repository = require('../dataAccess/repository.js');

var formatDateFromJSToMySQL = function(JSdate){
    return new Date(JSdate).toISOString().substring(0, 10);
};

exports.addPlazaContratacion = function(data, callback){
   
    var sp_params = data.idPlaza + "," + data.idContrato + "," + data.idDependencia + "," +
    data.idFuncionario + "," + data.porcentajeContratacion;
    
    repository.executeQuery({
        spName: 'sp_agregarPlazaContratacion',
        params: sp_params
    }, 
    function(success, dataQuery) {        
        if(success) {                
            callback({
                success: true, 
                message: "Plaza contratación agregada correctamente",
                data: {}
            });                                           
        } 
        else 
        {
        	callback(
            {
                success: false,
                data: null,
                message: "No se pudo agregar la plaza contratación"
            });
        }
    });        
};