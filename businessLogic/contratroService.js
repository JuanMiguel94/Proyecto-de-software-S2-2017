var repository = require('../dataAccess/repository.js');

var formatDateFromJSToMySQL = function(JSdate){
    return new Date(JSdate).toISOString().substring(0, 10);
};

exports.addContrato = function(data, callback){
    data.fechaInicio = formatDateFromJSToMySQL(data.fechaInicio);
    if (data.fechaFinal != ""){
        data.fechaFinal = formatDateFromJSToMySQL(data.fechaFinal);
    }
    var sp_params = data.idContratoLiberado + "," + data.idDependencia + "," +
    data.idFuncionario + "," + data.activo + "," + "\"" + data.actividad + "\"," +
    "\"" + data.descripcion + "\"," + data.anno + "," + "\"" + data.fechaInicio + "\"," +
    "\"" + data.fechaFinal + "\"," + "\"" + data.numeroConcurso + "\"," + data.suplencia + "," +
    "\"" + data.porqueContratacion + "\"," + "\"" + data.quienNombro + "\","+ "\"" + data.puestoQuienNombro + "\"," +
    data.porcentajeTotalContratacion + "," + data.porcentajeLiberado;
    
    repository.executeQuery({
        spName: 'sp_agregarContrato',
        params: sp_params
    }, 
    function(success, dataQuery) {
        if(success) {
            callback({
                success: true, 
                message: "El contrato se agregó correctamente",
                data: dataQuery[0][0].valid
            });                                           
        } 
        else 
        {
        	callback(
            {
                success: false,
                data: null,
                message: "No se pudo agregar contrato"
            });
        }
    });        
};