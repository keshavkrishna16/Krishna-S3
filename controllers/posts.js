const PostModel=require('../models/Post');

exports.createPostPage=(req,res,next)=>{
res.status(202).render('createPost');
}

exports.createPost=async (req,res,next)=>{
title=req.body.title;
username=req.body.username;
description=req.body.description;
file=req.file;
filepath=file.path;
if(!filepath) {
    return res.status(404).render('Error404')
}
try {
    const post = new PostModel(
        {
            title:title,
            username:username,
            description:description,
imageUrl:filepath,
        }
    );
    await post.save();
    console.log(post);
    res.status(202).redirect('/posts')

} catch (error) {
    res.status.render('Error404')
}
}

exports.getPost=(req,res,next)=>{
    PostModel.find().then(post=>{
        console.log(`Got from database = ${post}`)
res.status(202).render('getPosts',{
    posts:post
})
    }).catch(err=>{
        res.status(404).render('Error404')
    })
}