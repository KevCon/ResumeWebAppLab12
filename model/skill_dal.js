var mysql = require('mysql');
var db = require('./db_connection.js');

/* Configure database */
var connection  = mysql.createConnection(db.config);

exports.getAll = function(callback)
{
    var query = 'SELECT * FROM skill;';
    connection.query(query,function(err,result)
    {
        callback(err,result);
    });
};

exports.getById = function(skill_id, callback) {
    var query = 'SELECT * FROM skill WHERE skill_id = ?';
    var queryData = [skill_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback)
{
    var query = 'INSERT INTO skill (skill_name,description) VALUES (?,?)';
    var queryData = [params.skill_name,params.description];

    connection.query(query,queryData,function(err,result)
    {
        callback(err,result);
    });
};

exports.delete = function(skill_id,callback)
{
    var query = 'DELETE FROM skill WHERE skill_id = ?';
    var queryData = [skill_id];

    connection.query(query,queryData,function(err,result)
    {
        callback(err,result);
    });
};