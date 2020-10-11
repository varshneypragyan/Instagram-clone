var mongoose = require('mongoose');
var {ObjectId} = mongoose.Schema.Types
var postSchema  = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        default:"No Photo Available"
    },
    postedBy:{
        type:ObjectId,
        ref:"User"
    }
});


module.exports = mongoose.model("Post", postSchema);