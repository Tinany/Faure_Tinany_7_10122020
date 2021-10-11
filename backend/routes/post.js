//Technologies used
const express = require('express');
const router = express.Router();

//Post controller & middleware
const postController = require('../controllers/post');
const auth = require('../middleware/auth');

//Post routes
router.post('/createPost/', auth, postController.createPost);
router.delete('/post/delete/:id', auth, postController.deletePost);
router.get('/post/:id', auth, postController.getOnePost);
router.patch('/update/:id', auth, postController.updatePost);
router.get('/posts/', postController.getPosts);
router.get('/userPosts/', postController.getUserPosts);
router.get('/countUserPosts/:user_id', postController.countUserPosts);
router.get('/posts/creation_datePost/', auth, postController.getPostsByCreationDate);
router.get('/posts/modification_datePost/', auth, postController.getPostsByUpdateDate);

module.exports = router;