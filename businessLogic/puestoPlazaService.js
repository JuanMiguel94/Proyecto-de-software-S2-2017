var repository = require('../dataAccess/repository.js');

exports.addPuestoPlaza = function(data, callback){
    //codigoPuesto, puesto, idCategoria
    var sp_params = data.codigoPuesto + "," + "\"" + data.puesto + "\"," + data.idCategoria;
    repository.executeQuery({
        spName: 'sp_agregarPuestosPlaza',
        params: sp_params   
    }, 
    function(success, dataQuery) {
        if(success) {            
            callback({
                success: true, 
                message: "El puesto se agregó correctamente",
                data: dataQuery[0][0].valid
            });                
        } 
        else 
        {
        	callback(
            {
                success: false,
                data: null,
                message: "No se pudo agregar el puesto, por favor verifique todos los campos"
            });
        }
    });        
};