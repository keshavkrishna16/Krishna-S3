const express=require('express');
const routes=express.Router();
const postController=require('../controllers/posts');

routes.get('/',postController.createPostPage);

routes.post('/',postController.createPost);

routes.get('/posts',postController.getPost);

module.exports=routes;