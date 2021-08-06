//Technologies used
const express = require('express');
const router = express.Router();

//Post controller & middleware
const postController = require('../controllers/post');
const auth = require('../middleware/auth');

//Post routes
router.post('/createPost/', auth, postController.createPost);
router.delete('/post/delete/:post_id', auth, postController.deletePost);
router.put('/post/update/:post_id', auth, postController.updatePost);
router.get('/posts/', postController.getPosts);
router.get('/posts/creation_datePost/', auth, postController.getPostsByCreationDate);
router.get('/posts/modification_datePost/', auth, postController.getPostsByModificationDate);
router.get('/post/:id', auth, postController.getOnePost);

module.exports = router;