/**
 * Created by Kevin on 11/16/2016.
 */
/**
 * Created by Kevin on 11/16/2016.
 */
var mysql = require('mysql');
var db = require('./db_connection.js');

/* Configure database */
var connection  = mysql.createConnection(db.config);

exports.getAll = function(callback)
{
    var query = 'SELECT * FROM resumes;';
    connection.query(query,function(err,result)
    {
        callback(err,result);
    });
};

exports.getById = function(resumes_id, callback) {
    var query = 'SELECT * FROM resumes_view WHERE resumes_id = ?';
    var queryData = [resumes_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.delete = function(resumes_id, callback) {
    var query = 'DELETE FROM resumes WHERE resumes_id = ?';
    var queryData = [resumes_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};

exports.update = function(params,callback)
{
    var query = 'UPDATE resumes SET resumes_name = ? WHERE resumes_id =?';
    var queryData = [params.resumes_name,params.resumes_id];
    connection.query(query,queryData,function(err,result)
    {
        callback(err,result);
    });
};

var resumesCompanyInsert = function(resumes_id,companyIdArray,callback)
{
    var query = 'INSERT INTO resumes_company (resumes_id,company_id) VALUES ?';
    var resumesCompanyData = [];
    for(var i = 0; i < companyIdArray.length;i++)
    {
        resumesCompanyData.push([resumes_id,companyIdArray[i]]);
    }
    connection.query(query,[resumesCompanyData],function(err,result)
    {
        callback(err,result);
    });
};

module.exports.resumesCompanyInsert = resumesCompanyInsert;

var resumesSchoolInsert = function(resumes_id,schoolIdArray,callback)
{
    var query = 'INSERT INTO resumes_school (resumes_id,school_id) VALUES ?';
    var resumesSchoolData = [];
    for(var i = 0;i < schoolIdArray.length; i++)
    {
        resumesSchoolData.push([resumes_id,schoolIdArray[i]]);
    }
    connection.query(query,[resumesSchoolData],function(err,result)
    {
        callback(err,result);
    });
};
module.exports.resumesSchoolInsert = resumesSchoolInsert;


var resumesSkillInsert = function(resumes_id,skillIdArray,callback)
{
    var query = 'INSERT INTO resumes_skill (resumes_id,skill_id) VALUES ?';
    var resumesSkillData = [];
    for(var i = 0; i < skillIdArray.length; i++)
    {
        resumesSkillData.push([resumes_id,skillIdArray[i]]);
    }

    connection.query(query,[resumesSkillData],function(err,result)
    {
        callback(err,result);
    });
};


module.exports.resumesSkillInsert = resumesSkillInsert;