/**
 * Created by Kevin on 12/17/2016.
 */
var express = require('express');
var router = express.Router();
var address_dal = require('../model/address_dal');

// View ALL address
router.get('/all',function(req,res)
{
    address_dal.getAll(function(err,result)
    {
        if(err)
        {
            res.send(err);
        }
        else
        {
            res.render('address/addressViewAll', {'result':result});
        }

    });
});


// View address by id
router.get('/',function(req,res) {
    if (req.query.address_id == null)
    {
        res.send(err);
    }
    else
    {
        address_dal.getById(req.query.address_id,function(err,result)
        {
            if (err) {
                res.send(err);
            }
            else
            {
                res.render('address/addressViewById', {'result': result});
            }
        });
    }
});

router.get('/add',function(req,res)
{
    address_dal.getAll(function(err,result)
    {
        if(err)
        {
            res.send(err);
        }
        else
        {
            res.render('address/addressAdd',{'address_name': result});
        }
    });
});

router.get('/delete',function(req,res)
{
    if(req.query.address_id == null)
    {
        res.send('address id is null');
    }
    else
    {
        address_dal.delete(req.query.address_id, function(err,result)
        {
            if(err)
            {
                res.send(err);
            }
            else
            {
                res.redirect(302,'/address/all');
            }
        });
    }
});

router.get('/insert',function(req,res)
{
    if(req.query.street == null)
    {
        res.send("please insert a street address");
    }
    else if(req.query.zip_code == null)
    {
        res.send("please insert a zip code");
    }

    else
    {
        address_dal.insert(req.query,function(err,result)
        {
            if(err)
            {
                res.send(err);
            }
            else
            {
                res.redirect(302,'/address/all');
            }
        });
    }
});

module.exports = router;