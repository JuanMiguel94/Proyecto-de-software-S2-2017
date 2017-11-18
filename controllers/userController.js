/*
 *Tecnologico de Costa Rica
 *Proyecto de ingenieria de software
 *Jose Hidalgo Bonilla
 *Sistema de apoyo administrativo
 *Controlador de usuarios
*/
var userService   = require('../businessLogic/userService.js');

exports.getAllUsers = function(dRequest, dResponse) {
    var data = userService.allUsers(function(data){
        dResponse.send(data);
    });
};

exports.getUserById = function(dRequest, dResponse) {
    var data = userService.userById(dRequest.params, function(data){
        dResponse.send(data);
    });
};

exports.addUser= function(dRequest, dResponse) {
    var data = userService.addUser(dRequest.body, function(data) {
        dResponse.send(data);
    });
};

exports.updateUser= function(dRequest, dResponse) {
    var data = userService.updateUser(dRequest.body, function(data) {
        dResponse.send(data);
    });
};

exports.disableUser= function(dRequest, dResponse) {
    var data = userService.disableUser(dRequest.body, function(data) {
        dResponse.send(data);
    });
};

exports.changePassword = function(dRequest, dResponse) {
    var data = userService.changePassword(dRequest.body, function(data) {
        dResponse.send(data);
    });
};