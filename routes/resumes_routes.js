var express = require('express');
var router = express.Router();
var resumes_dal = require('../model/resumes_dal');
var account_dal = require('../model/account_dal');
var skill_dal = require('../model/skill_dal');
var company_dal = require('../model/company_dal');
var school_dal = require('../model/school_dal');



// View ALL accounts
router.get('/all',function(req,res)
{
    resumes_dal.getAll(function(err,result)
    {
        if(err)
        {
            res.send(err);
        }
        else
        {
            res.render('resumes/resumesViewAll', {'result':result});
        }

    });
});


// View resumes by id
router.get('/',function(req,res) {
    if (req.query.resumes_id == null)
    {
        res.send(err);
    }
    else
    {
        resumes_dal.getById(req.query.resumes_id,function(err,result)
        {
            if (err) {
                res.send(err);
            }
            else
            {
                res.render('resumes/resumesById', {'result': result});
            }
        });
    }
});

router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    skill_dal.getAll(function(err,skills)
    {
        if (err) {
            res.send(err);
        }
        else
        {
            resumes_dal.getAll(function(err,resumess)
            {
                if(err)
                {
                    res.send(err);
                }
                else
                {
                    account_dal.getAll(function(err,accounts)
                    {
                        if(err)
                        {
                            res.send(err);
                        }
                        else
                        {
                            company_dal.getAll(function(err,companies)
                            {
                                if(err)
                                {
                                    res.send(err);
                                }
                                else
                                {
                                    school_dal.getAll(function(err,schools)
                                    {
                                        if(err)
                                        {
                                            res.send(err);
                                        }
                                        else
                                        {
                                            var results = {'skill': skills,'resumes':resumess,'account':accounts,'company':companies,'school':schools};
                                            res.render('resumes/resumesAdd', results);
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
});

router.get('/delete', function(req, res){
    if(req.query.resumes_id == null) {
        res.send('resumes_id is null');
    }
    else {
        resumes_dal.delete(req.query.resumes_id, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/resumes/all');
            }
        });
    }
});

router.get('/insert', function(req, res){
    // simple validation
    if(req.query.resumes_name == null) {
        res.send('Resumes Name must be provided.');
    }
    else if(req.query.account_id == null) {
        res.send('An account must be selected');
    }

    else if(req.query.skill_id == null)
    {
        res.send('skill must be inserted');
    }
    else if(req.query.company_id == null)
    {
        res.send('company must be inserted');
    }

    else if(req.query.school_id == null)
    {
        res.send('school must be added');
    }

    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        resumes_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/resumes/all');
            }
        });
    }
});

router.get('/update',function(req,res)
{
    resumes_dal.update(req.query,function(err,result)
    {
        res.redirect(302,'/resumes/all')
    });
});

router.get('/edit2',function(req,res)
{
    if(req.query.resumes_id == null)
    {
        res.send('please choose a resumes');
    }
    else
    {
        resumes_dal.getById(req.query.resumes_id,function(err,resumess)
        {
            res.render('resumes/resumesUpdate',{resumes :resumess[0]});
        })
    }
});

module.exports = router;