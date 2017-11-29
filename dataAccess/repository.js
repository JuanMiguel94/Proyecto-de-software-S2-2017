/*
 *Tecnologico de Costa Rica
 *Proyecto de ingenieria de software
 *Luis Javier Ramírez Torres
 *Sistema de apoyo administrativo
*/
var connection = require('./connection.js');

exports.executeQuery = function(data, callback) {
    var sql = 'CALL '+data.spName+'('+data.params+')';      
    var conn = connection.createConnection();    
    conn.connect(function(err) {
    if(err) {
        console.log("Error: ", err);
        callback(false, null);
    }});
   

    conn.query(sql, function(err, rows) {
        if(err) {
            console.log(sql)
            callback(false, null);
        }
        else {
            callback(true, rows); 
        }
    })  
    conn.end()  
};


    