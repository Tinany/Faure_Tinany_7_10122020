//Technologies used
const express = require('express');
const router = express.Router();

//Comment controller & middleware
const commentController = require('../controllers/comment');
const auth = require('../middleware/auth');

//Comment routes
router.post('/createComment/', auth, commentController.createComment);
router.get('/comments/post/:post_id', commentController.findAllComments);
router.get('/comment/:comment_id', auth, commentController.findCommentById);
router.put('/comment/update/:comment_id', auth, commentController.updateComment);
router.delete('/comment/delete/:comment_id', auth, commentController.deleteOneComment);

module.exports = router;