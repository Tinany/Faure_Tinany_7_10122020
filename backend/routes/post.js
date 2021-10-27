//Technologies used
const express = require('express');
const router = express.Router();

//Post controller & middleware
const postController = require('../controllers/post');
const auth = require('../middleware/auth');
const {checkPostAndComment} = require('../middleware/validator');

//Post routes
router.post('/createPost/', auth, checkPostAndComment, postController.createPost);
router.get('/onePost/:post_id', auth, postController.getOnePost);
router.get('/posts/', postController.getPosts);
router.get('/userPosts/', postController.getUserPosts);
router.patch('/update/:post_id', auth, checkPostAndComment, postController.updatePost);
router.delete('/delete/:post_id', auth, postController.deletePost);

module.exports = router;