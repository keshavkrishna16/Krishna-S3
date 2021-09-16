const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const postSchema=new Schema({
title:{
type:String,
required:true,
},
description:{
    type:String,
    required:true,
},
imageUrl:{
    type:String,
    required:true,
},
username:{
    type:String,
    required:true,
    unique:true,
}
})

module.exports=mongoose.model('Post',postSchema)