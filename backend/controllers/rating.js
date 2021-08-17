const Rating = require('../models/Rating');

exports.addRating = (req,res) => {

    Rating.findByPostId(req.body.post_id)
    .then(like => {

        let user_id = req.body.user_id;
        let userWantsToLike = (req.body.likes === 1);
        let userWantsToCancel = (req.body.likes === 0);
        let userCanLike = (!like.includes(user_id));
        let userCanCancel = (like.includes(user_id));

        if (userWantsToLike && userCanLike) {

            Rating.like(like, (err, data) => {
                if(err) {
                    res.status(500).send({
                        message : err.message
                    });
                    console.log(data)
                    res.send(data);
                }
            })
        }

        if (userWantsToCancel && userCanCancel) {
            Rating.cancelRating(req.body.post_id, req.body.user_id, (err, data) => {
                if(err) {
                    res.status(500).send({
                        message : err.message
                    });
                    console.log(data)
                    res.send(data);
                }
            })
        }
    })
    .catch(error => res.status(404).json({error: error}))
}