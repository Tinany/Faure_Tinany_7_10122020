//Technologies used
const express = require('express');
const router = express.Router();

//Post controller & middleware
const postController = require('../controllers/post');
const auth = require('../middleware/auth');
const {checkPostAndComment} = require('../middleware/validator');

//Post routes
router.post('/createPost/', auth, checkPostAndComment, postController.createPost);
router.get('/onePost/:id', auth, postController.getOnePost);
router.get('/posts/', postController.getPosts);
router.get('/userPosts/', postController.getUserPosts);
router.get('/posts/creation_datePost/', auth, postController.getPostsByCreationDate);
router.get('/posts/modification_datePost/', auth, postController.getPostsByUpdateDate);

router.patch('/update/:id', auth, checkPostAndComment, postController.updatePost);
router.delete('/post/delete/:id', auth, postController.deletePost);

module.exports = router;