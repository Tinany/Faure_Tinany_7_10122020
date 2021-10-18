//Technologies used
const express = require('express');
const router = express.Router();

//Comment controller & middleware
const commentController = require('../controllers/comment');
const auth = require('../middleware/auth');
const {checkPostAndComment} = require('../middleware/validator');

//Comment routes
router.post('/createComment/', auth, checkPostAndComment, commentController.createComment);
router.get('/comments/post/:post_id', commentController.findAllComments);
router.get('/comments/post/:user_id', commentController.findUserComments);
router.get('/comment/:comment_id', auth, commentController.findCommentById);
router.patch('/comment/update/:comment_id', auth, checkPostAndComment, commentController.updateComment);
router.delete('/comment/delete/:comment_id', auth, commentController.deleteOneComment);

module.exports = router;