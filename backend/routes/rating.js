const express = require('express');
const router = express.Router();

const ratingController = require('../controllers/rating');
const auth = require('../middleware/auth');

/*router.post('/:post_id/rating', auth, ratingController.addRating);*/

module.exports = router;