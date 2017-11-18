/*
 *Tecnologico de Costa Rica
 *Proyecto de ingenieria de software
 *Luis Javier Ramírez Torres
 *Sistema de apoyo administrativo
*/
var repository = require('../dataAccess/repository.js');
var userValidator = require('./dataValidator/userValidator.js');

var formatDateFromJSToMySQL = function(JSdate){
    return new Date(JSdate).toISOString().substring(0, 10);
};

exports.allUsers = function(callback){
    repository.executeQuery({
        spName: 'sp_obtenerUsuarios',
        params: ''
    }, 
    function(success, data) {
        if(success) {
            data = data[0];
            if (data.length == 0){
                callback(
                {
                    success: false,
                    data: null,
                    message: "No hay registro de usuarios"
                });
            }
            else{
                callback(
                    {
                        success: true,
                        message: "Operación exitosa",
                        data: data
                    });
            }
        } 
        else 
        {callback(
            {
                success: false,
                data: null,
                message: "No se pudo establecer la conexión a la base de datos"
            });
        }
    });
};

exports.userByUsername = function(data, callback){
    repository.executeQuery({
        spName: 'sp_getUserByUsername',
        params: data.id
    }, 
    function(success, data) {
        if(success) {
            data = data[0];
            if (data.length == 0){
                callback(
                {
                    success: false,
                    data: null,
                    message: "No se encontró ningún registro del usuario solicitado"
                });
            }
            else{
                data = data[0];
                callback(
                    {
                        success: true,
                        data: data,
                        message: ""
                    });
            }
        } 
        else 
        {callback(
            {
                success: false,
                errorCode: 405,
                errorMsg: "No se pudo establecer la conexión a la base de datos"
            });
        }
    });
};

exports.addUser = function(data, callback){
    var validationStatus;
    validationStatus = userValidator.validateData(data);
    if(!validationStatus.success){
        callback(
            {
                success: false,
                data: null,
                message: validationStatus.message
            });
        return;
    }

    validationStatus = userValidator.validateDates(data.fechaInicioAutorizacion, data.fechaFinalAutorizacion);
    if(!validationStatus.success){
        callback(
            {
                success: false,
                data: null,
                message: validationStatus.message
            });
        return;
    }

    data.fechaInicioAutorizacion = formatDateFromJSToMySQL(data.fechaInicioAutorizacion);
    data.fechaFinalAutorizacion = formatDateFromJSToMySQL(data.fechaFinalAutorizacion);
    var paramsString = '\"'+data.usuario+'\"'+','+
                '\"'+data.contrasena+'\"'+','+
                '\"'+data.cedula+'\"'+','+
                '\"'+data.nombre+'\"'+','+
                '\"'+data.correo+'\"'+','+
                '\"'+data.tipo+'\"'+','+
                 data.activo +','+
                '\"'+data.fechaInicioAutorizacion+'\"'+','+
                '\"'+data.fechaFinalAutorizacion+'\"';

    repository.executeQuery({
        spName: 'sp_agregarUsuario',
        params: paramsString
    }, 
    function(success, dataQuery) {
        if(success) {
            if(dataQuery[0][0].valid == 1) {
                var paramsString2 = '\"' + data.usuarioActual + '\"' + ',' + '\"' + data.usuario + '\"' + ',' + '\"' + 'i' + '\"';
                repository.executeQuery({
                    spName: 'sp_historialGestionUsuario',
                    params:  paramsString2
                },
                function(success2, data2) {
                    callback(
                    {
                        success: true,
                        data: null,
                        message: "El usuario se agregó correctamente"
                    });
                });
            }
            else{
                callback(
                {
                    success: false,
                    data: null,
                    message: "El usuario ya existe"
                });
            }
        } 
        else 
        {callback(
            {
                success: false,
                data: null,
                message: "Por favor asegúrese de que los datos ingresados estén correctos."
            });
        }
    }); 
};

exports.updateUser = function(data, callback){
    var nameStatus = userValidator.validateData(data);
    if(!nameStatus.success){
        callback(
            {
                success: false,
                data: null,
                message: nameStatus.message
            });
        return;
    }

    validationStatus = userValidator.validateDates(data.fechaInicioAutorizacion, data.fechaFinalAutorizacion);
    if(!validationStatus.success){
        callback(
            {
                success: false,
                data: null,
                message: validationStatus.message
            });
        return;
    }
    
    data.fechaInicioAutorizacion = formatDateFromJSToMySQL(data.fechaInicioAutorizacion);
    data.fechaFinalAutorizacion = formatDateFromJSToMySQL(data.fechaFinalAutorizacion);
    var paramsString = '\"'+data.usuario+'\"'+','+
                        '\"'+data.contrasena+'\"'+','+
                        '\"'+data.nombre+'\"'+','+
                        '\"'+data.cedula+'\"'+','+
                        '\"'+data.correo+'\"'+','+
                        '\"'+data.tipo+'\"'+','+
                        data.activo +','+
                        '\"'+data.fechaInicioAutorizacion+'\"'+','+
                        '\"'+data.fechaFinalAutorizacion+'\"';
    repository.executeQuery({
        spName: 'sp_actualizarUsuario',
        params: paramsString
    }, 
    function(success, dataQuery) {
        if(success) {
            var paramsString2 = '\"' + data.usuarioActual + '\"' + ',' + '\"' + data.usuario + '\"' + ',' + '\"' + 'm' + '\"';
            repository.executeQuery({
                spName: 'sp_historialGestionUsuario',
                params:  paramsString2
            },
            function(success2, data2) {
                callback(
                {
                    success: true,
                    data: null,
                    message: "El usuario se actualizó correctamente"
                });
            });
        } 
        else 
        {callback(
            {
                success: false,
                data: null,
                message: "Por favor asegúrese de selecionar un usuario antes de actualizar o que el nombre del usuario no está en uso"
            });
        }
    }); 
};

exports.disableUser = function(data, callback){
    
    
    var paramsString = '\"'+data.usuario+'\"';
    repository.executeQuery({
        spName: 'sp_deshabilitarUsuario',
        params: paramsString
    }, 
    function(success, dataQuery) {
        if(success) {
            var paramsString2 = '\"' + data.usuarioActual + '\"' + ',' + '\"' + data.usuario + '\"' + ',' + '\"' + 'd' + '\"';
            repository.executeQuery({
                spName: 'sp_historialGestionUsuario',
                params:  paramsString2
            },
            function(success2, data2) {
                callback(
                {
                    success: true,
                    data: null,
                    message: "El usuario se actualizó correctamente"
                });
            });
        } 
        else 
        {callback(
            {
                success: false,
                data: null,
                message: "Por favor asegúrese de selecionar un usuario antes de actualizar o que el nombre del usuario no está en uso"
            });
        }
    }); 
};


exports.changePassword = function(data, callback) {
    var passwordsStatus = userValidator.validatePasswords(data.currentPassword, data.newPassword, data.newPassword2);
    if(!passwordsStatus.success){
        callback(
            {
                success: false,
                data: null,
                message: passwordsStatus.message
            });
        return;
    }

    var paramsString = '\"' + data.usuario + '\"' + ',' + '\"' + data.currentPassword + '\"' + ',' + '\"' + data.newPassword + '\"';
    repository.executeQuery({
        spName: 'sp_cambiarContrasena',
        params: paramsString
    }, 
    function(success, data) {
        if(success) {
            data = data[0][0].valid;
            if(data == 1) {
                callback(
                {
                    success: true,
                    data: null,
                    message: "La contraseña se actualizó correctamente"
                });
            }
            else{
                callback(
                {
                    success: false,
                    data: null,
                    message: "La contraseña actual es incorrecta"
                });
            }
        } 
        else 
        {callback(
            {
                success: false,
                data: null,
                message: "Error actualizando la contraseña"
            });
        }
    }); 
};