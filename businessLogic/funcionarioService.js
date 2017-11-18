/*
 *Tecnologico de Costa Rica
 *Proyecto de ingenieria de software
 *Jose Alberto Hidalgo Bonilla
 *Sistema de apoyo administrativo
*/
var repository = require('../dataAccess/repository.js');

var formatDateFromJSToMySQL = function(JSdate){
    return new Date(JSdate).toISOString().substring(0, 10);
};

exports.createFuncionario = function(data, callback){
    var paramsString = '\"'+data.cedula+'\"'+','+
                       '\"'+data.nombre+'\"'+','+
                       '\"'+data.primerApellido+'\"'+','+
                       '\"'+data.segundoApellido+'\"'+','+
                            data.activo+','+
                       '\"'+formatDateFromJSToMySQL(data.fecha)+'\"'+','+
                       '\"'+data.especialidad+'\"';

    repository.executeQuery({
        spName:  'sp_agregarFuncionario',
        params: paramsString
    },
    function(success, dataQuery) {
        if(success) {
            if(dataQuery[0][0].idF == -1) {
                callback({
                    status: false, 
                    message: 'Ya existe un funcionario con esa cédula',
                    data: {}
                });
            }
            else{
                var paramsString2 = '\"'+data.usuarioActual+'\"'+','+
                                        dataQuery[0][0].idF+','+ '\"' + 'i' + '\"';
                repository.executeQuery({
                    spName:  'sp_historialGestionFuncionario',
                    params: paramsString2
                },
                function(success2, data2) {
                    callback({
                        status: true, 
                        message: 'Se ha registrado la informacion del funcionario de manera exitosa',
                        data: dataQuery[0][0].idF
                    });
                });
            }
        } 
        else {
            callback({
                status: false, 
                message: 'Ha ocurrido un error, no se ha registrado el funcionario',
                data: {}
            });
        }
    });    
};

exports.createAcademicInfo = function(data, callback){
    var paramsString = 		data.id+','+
    				   '\"'+data.params.titulo+'\"'+','+
                       '\"'+data.params.universidad+'\"'+','+
                       '\"'+data.params.grado+'\"'+','+
                       '\"'+formatDateFromJSToMySQL(data.params.annoGraduacion).substring(0,4)+'\"';
    repository.executeQuery({
        spName:  'sp_agregarTitulo',
        params: paramsString
    },
    function(success, data) {
        if(success) {
            callback({
                status: true, 
                message: 'Se ha registrado la informacion academica del funcionario de manera exitosa',
                data: {}
            });
        } 
        else {
            callback({
                status: false, 
                message: 'Ha ocurrido un error, no se ha registrado la informacion academica del funcionario',
                data: {}
            });
        }
    });    
};

exports.createAntecedentesFuncionario = function(data, callback){
    var paramsString = data.id + ',' +	'\"'+data.params.descripcion+'\"';
    repository.executeQuery({
        spName:  'sp_agregarAntecedente',
        params: paramsString
    },
    function(success, data) {
        if(success) {
            callback({
                status: true, 
                message: 'Se ha registrado la descripcion de antecedentes del funcionario de manera exitosa',
                data: {}
            });
        } 
        else {
            callback({
                status: false, 
                message: 'Ha ocurrido un error, no se ha registrado los antecedentes del funcionario',
                data: {}
            });
        }
    });    
};

exports.updateFuncionario = function(data, callback){
    var paramsString =  '\"'+data.id+'\"'+','+
                        '\"'+data.infoPersonal.cedula+'\"'+','+
                       '\"'+data.infoPersonal.nombre+'\"'+','+
                       '\"'+data.infoPersonal.apellido1+'\"'+','+
                       '\"'+data.infoPersonal.apellido2+'\"'+','+
                            data.activo+','+
                       '\"'+formatDateFromJSToMySQL(data.infoPersonal.fechaNacimiento)+'\"'+','+
                       '\"'+data.infoPersonal.areaEspecialidad+'\"';

    repository.executeQuery({
        spName:  'sp_actualizarFuncionario',
        params: paramsString
    },
    function(success, dataQuery) {
        if(success) {
            if(dataQuery[0][0].valid == 0) {
                callback({
                    status: false, 
                    message: 'Ya existe un funcionario con esa cédula',
                    data: {}
                });
            }
            else {
                var paramsString2 = '\"'+data.usuarioActual+'\"'+','+
                                data.idFuncionario+','+ '\"' + 'm' + '\"';
                repository.executeQuery({
                    spName:  'sp_historialGestionFuncionario',
                    params: paramsString2
                },
                function(success2, data2) {
                    callback({
                        status: true, 
                        message: 'Se ha modificado la informacion del funcionario de manera exitosa',
                        data: {}
                    });
                });
            }
        } 
        else {
            callback({
                status: false, 
                message: 'Ha ocurrido un error, no se ha modificado el funcionario',
                data: {}
            });
        }
    });    
};

exports.updateAcademicInfo = function(data, callback){
    var paramsString =      data.id+','+
                        '\"'+data.idFuncionario+'\"'+','+
                       '\"'+data.titulo+'\"'+','+
                       '\"'+data.universidad+'\"'+','+
                       '\"'+data.grado+'\"'+','+
                       '\"'+formatDateFromJSToMySQL(data.annoGraduacion).substring(0,4)+'\"';
    repository.executeQuery({
        spName:  'sp_actualizarTituloFuncionario',
        params: paramsString
    },
    function(success, dataQuery) {
        if(success) {
            var paramsString2 = '\"'+data.usuario+'\"'+','+
                                data.idFuncionario+','+ '\"' + 'm' + '\"';
            repository.executeQuery({
                spName:  'sp_historialGestionFuncionario',
                params: paramsString2
            },
            function(success2, data2) {
                callback({
                    status: true, 
                    message: 'Se ha registrado la informacion academica del funcionario de manera exitosa',
                    data: {}
                });
            });
        } 
        else {
            callback({
                status: false, 
                message: 'Ha ocurrido un error, no se ha registrado la informacion academica del funcionario',
                data: {}
            });
        }
    });    
};

exports.updateAntecedentesFuncionario = function(data, callback){
    var paramsString = data.id + ',' +  
                    '\"'+data.idFuncionario+'\"' + ',' +  
                    '\"'+data.descripcion+'\"';
                    
    repository.executeQuery({
        spName:  'sp_actualizarAntecedenteFuncionario',
        params: paramsString
    },
    function(success, dataQuery) {
        if(success) {
            var paramsString2 = '\"'+data.usuario+'\"'+','+
                                data.idFuncionario+','+ '\"' + 'm' + '\"';
            repository.executeQuery({
                spName:  'sp_historialGestionFuncionario',
                params: paramsString2
            },
            function(success2, data2) {
                callback({
                    status: true, 
                    message: 'Se ha registrado la descripcion de antecedentes del funcionario de manera exitosa',
                    data: {}
                });
            });
        } 
        else {
            callback({
                status: false, 
                message: 'Ha ocurrido un error, no se ha registrado los antecedentes del funcionario',
                data: {}
            });
        }
    });    
};

exports.getAllFuncionarios = function(callback){

    repository.executeQuery({
        spName: 'sp_obtenerFuncionarios',
        params: ''
    }, 
    function(success, data) {
        if(success) {
            data = data[0];
            if(data.length > 0) {
                callback({
                    status: true, 
                    message: 'Se ha obtenido la lista de funcionarios de manera exitosa',
                    data: data
                });
            }
            else {
                callback({
                    status: false, 
                    message: 'No se han encontrado funcionarios registrados activos',
                    data: {}
                });
            }
        } 
        else {
            callback({
                status: false, 
                message: 'Ha ocurrido un error, no se ha obtenido la lista de funcionarios',
                data: {}
            });
        }
    });    
};

exports.getFuncionario = function(data, callback){

    repository.executeQuery({
        spName: 'sp_obtenerFuncionario',
        params:  data.id
    }, 
    function(success, data) {
        if(success) {
            data = data[0];
            if(data.length > 0) {
                callback({
                    status: true, 
                    message: 'Se ha obtenido el funcionario de manera exitosa',
                    data: data[0]
                });
            }
            else {
                callback({
                    status: false, 
                    message: 'El funcionario no se encuantra registrado',
                    data: {}
                });
            } 
        } 
        else {
            callback({
                status: false, 
                message: 'Ha ocurrido un error, no se ha obtenido el funcionario',
                data: {}
            });
        }
    });    
};

exports.getAcademicFuncionarioInfo = function(data, callback){

    repository.executeQuery({
        spName: 'sp_obtenerTitulosPorFuncionario',
        params:  data.id
    }, 
    function(success, data) {
        if(success) {
            data = data[0];
            if(data.length > 0) {
                callback({
                    status: true, 
                    message: 'Se ha obtenido la informacion academica del funcionario de manera exitosa',
                    data: data
                });
            }
            else {
                callback({
                    status: false, 
                    message: 'El funcionario no tiene informacion academica registrada',
                    data: {}
                });
            } 
        } 
        else {
            callback({
                status: false, 
                message: 'Ha ocurrido un error, no se ha obtenido la informacion academica del funcionario',
                data: {}
            });
        }
    });    
};

exports.getAntecedentesFuncionario = function(data, callback){

    repository.executeQuery({
        spName: 'sp_obtenerAntecedentesPorFuncionario',
        params:  data.id
    }, 
    function(success, data) {
        if(success) {
            data = data[0];
            if(data.length > 0) {
                callback({
                    status: true, 
                    message: 'Se ha obtenido la informacion del funcionario de manera exitosa',
                    data: data
                });
            }
            else {
                callback({
                    status: false, 
                    message: 'El funcionario no posee antecedentes',
                    data: {}
                });
            } 
        } 
        else {
            callback({
                status: false, 
                message: 'Ha ocurrido un error, no se ha obtenido la informacion de antecedentes del funcionario',
                data: {}
            });
        }
    });    
};

exports.disableFuncionario = function(data, callback){

    repository.executeQuery({
        spName:  'sp_deshabilitarFuncionario',
        params: data.funcionarioId
    },
    function(success, dataQuery) {
        if(success) {
            var paramsString = '\"'+data.usuario+'\"'+','+
                                data.funcionarioId+','+ '\"' + 'd' + '\"';
            repository.executeQuery({
                spName:  'sp_historialGestionFuncionario',
                params: paramsString
            },
            function(success2, data2) {
                callback({
                    status: true, 
                    message: 'Se ha deshabilitado el funcionario de manera exitosa',
                    data: {}
                });
            });
        } 
        else {
            callback({
                status: false, 
                message: 'Ha ocurrido un error, no se ha deshabilitado el funcionario',
                data: {}
            });
        }
    });   
};