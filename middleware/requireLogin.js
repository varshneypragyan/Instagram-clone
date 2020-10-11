var jwt = require('jsonwebtoken');
var {JWT_SECRET} = require('../keys');
var mongoose = require('mongoose');
var User = require('../models/user');

module.exports = (req, res, next)=>{
    var {authorization} = req.headers;
    if(!authorization) {
        res.status(401).json({
            error:"you must be logged in"
        })
    }
    var token = authorization.replace("Bearer ", "");
    jwt.verify(token, JWT_SECRET, (err, payload)=>{
        if(err) {
            return res.status(401).json({
                error:"you must be logged in"
            });
        }
        var {_id} = payload;
        User.findById(_id).then(userData=>{
            req.user = userData
            next()
        })
    })
}