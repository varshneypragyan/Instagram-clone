var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    Post = require('../models/post'),
    requireLogin = require('../middleware/requireLogin');

router.post('/createpost', requireLogin, (req, res)=>{
    var {title, body} = req.body;
    if(!title || !body) {
        return res.status(422).json({
            error:"Please the neccesary fields"
        })
    }
    var post = new Post({
        title,
        body,
        postedBy:req.user
    });
    post.save().then(result=>{
        res.json({
            post:result
        })
    }).catch(err=>{
        console.log(err);
    })
});

router.get('/allpost', (req, res)=>{
    Post.find()
    .populate("postedBy","_id name")
    .then(posts=>{
        res.json({
            posts
        }).catch(err=>{
            console.log(err);
        })
    })
})

router.get('/mypost',requireLogin, (req, res)=>{
    Post.find({postedBy:req.user._id})
    .populate("PostedBy", "_id name")
    .then(myPost=>{
        res.json({myPost});
    })
    .catch(err=>{
        console.log(err);
    })
})
module.exports = router;