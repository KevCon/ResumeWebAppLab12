/**
 * Created by Kevin on 12/17/2016.
 */
var express = require('express');
var router = express.Router();
var account_dal = require('../model/account_dal');

// View ALL accounts
router.get('/all',function(req,res)
{
    account_dal.getAll(function(err,result)
    {
        if(err)
        {
            res.send(err);
        }
        else
        {
            res.render('account/accountViewAll', {'result':result});
        }

    });
});


// View school by id
router.get('/',function(req,res) {
    if (req.query.account_id == null)
    {
        res.send(err);
    }
    else
    {
        account_dal.getById(req.query.account_id,function(err,result)
        {
            if (err) {
                res.send(err);
            }
            else
            {
                res.render('account/accountViewById', {'result': result});
            }
        });
    }
});


router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    account_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('account/accountAdd', {'account_name': result});
        }
    });
});

router.get('/delete', function(req, res){
    if(req.query.account_id == null) {
        res.send('account_id is null');
    }
    else {
        account_dal.delete(req.query.account_id, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/account/all');
            }
        });
    }
});

router.get('/insert', function(req, res){
    // simple validation
    if(req.query.email == null) {
        res.send('email must be provided.');
    }
    else if(req.query.first == null) {
        res.send('first must be provided.');
    }
    else if(req.query.last == null) {
        res.send('last must be inserted');
    }

    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        account_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/account/all');
            }
        });
    }
});
module.exports = router;