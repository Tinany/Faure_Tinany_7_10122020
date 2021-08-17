//Technologies used
const express = require('express');
const router = express.Router();

//Rating controller & middleware
const ratingController = require('../controllers/rating');
const auth = require('../middleware/auth');

//Rating routes
router.post('/:post_id/rating', auth, ratingController.addRating);

module.exports = router;