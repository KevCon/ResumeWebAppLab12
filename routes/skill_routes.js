var express = require('express');
var router = express.Router();
var skill_dal = require('../model/skill_dal');

// View ALL accounts
router.get('/all',function(req,res)
{
    skill_dal.getAll(function(err,result)
    {
        if(err)
        {
            res.send(err);
        }
        else
        {
            res.render('skill/skillViewAll', {'result':result});
        }

    });
});


// View school by id
router.get('/',function(req,res) {
    if (req.query.skill_id == null)
    {
        res.send(err);
    }
    else
    {
        skill_dal.getById(req.query.skill_id,function(err,result)
        {
            if (err) {
                res.send(err);
            }
            else
            {
                res.render('skill/skillViewById', {'result': result});
            }
        });
    }
});

router.get('/add',function(req,res)
{
    skill_dal.getAll(function(err,result)
    {
        if(err)
        {
            res.send(err);
        }
        else
        {
            res.render('skill/skillAdd',{'skill_name': result});
        }
    });
});

router.get('/insert',function(req,res)
{
    if(req.query.skill_name == null)
    {
        res.send('need skill name');
    }
    else if(req.query.description == null)
    {
        res.send("need skill name")
    }
    else
    {
        skill_dal.insert(req.query,function(err,result)
        {
            if(err)
            {
                res.send(err);
            }

            else
            {
                res.redirect(302,'/skill/all');
            }
        });
    }
});

router.get('/delete',function(req,res)
{
    if(req.query.skill_id == null)
    {
        res.send("skill id missing");
    }
    else
    {
        skill_dal.delete(req.query.skill_id,function(err,result)
        {
            if(err)
            {
                res.send(err);
            }
            else
            {
                res.redirect(302,'/skill/all');
            }
        });
    }
});

module.exports = router;