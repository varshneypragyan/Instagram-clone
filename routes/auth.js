var express = require('express');
var User = require('../models/user.js');
var router = express.Router();
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');


router.post('/signup', (req, res)=>{
    var {name, email, password} = req.body;
    if(!name || !email || !password) {
        return res.status(422).json({
            error: "Please enter all marked fields"
        })
    }
    User.findOne({
        email:email
    }).then((savedUser)=>{
        if(savedUser) {
            return res.status(422).json({
                error:"user already exists"
            })
        }
        bcrypt.hash(password, 12).then(hashedPass=>{
            var user = new User({
                email, password:hashedPass, name
            });
            user.save().then(user=>{
                res.json({
                    message: "Succesfully signed up"
                })
            }).catch(err=>{
                console.log(err);
            })
        })
    }).catch(err=>{
        console.log(err);
    })
})

router.post('/signin', (req, res)=>{
    var {email, password} = req.body;
    if(!email || !password) {
        return res.status(422).json({
            error: "Please username or password"
        })
    }
    User.findOne({email:email}).then(savedUser=>{
        if(!savedUser) {
            return res.status(404).json({
                error : "Invalid Email or Password"
            })
        }
        bcrypt.compare(password, savedUser.password).then(matched=>{
            if(matched) {
                res.json({
                    message:"successfully signed in"
                })
            }else {
                return res.status(404).json({
                    error:"Invalid Email or Password"
                })
            }
        }).catch(err=>{
            console.log(err);
        })
    })
});


module.exports = router;