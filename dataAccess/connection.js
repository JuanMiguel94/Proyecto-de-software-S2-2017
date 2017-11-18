/*
 *Tecnologico de Costa Rica
 *Proyecto de ingenieria de software
 *Luis Javier Ramírez Torres
 *Sistema de apoyo administrativo
*/

var mysql = require('mysql2');  
var fs = require('fs'); 


var readJsonFile = function() {

    var connectionParams = fs.readFileSync("./configuration.json");
    var config = {};

    try {
        config = JSON.parse(connectionParams);
    } 
    catch (err) {
        console.log(err);
    }
    return config;
};  

exports.createConnection = function() {
    var config = readJsonFile();
    return mysql.createConnection(config.params);
};





