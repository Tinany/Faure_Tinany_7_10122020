const database = require('../config/database');

//Constructor
const Rating= function(rating) {
    this.state = rating.state,
    this.users_id = rating.user_id,
    this.post_id = rating.post_id
};

//Like a post
Rating.like = (newLike, result) => {
    return new Promise((resolve, reject) => {
        database.query(
            "INSERT INTO groupomania.rating SET ?", newLike,
            (err, res) => {
                if (err) {
                    console.log("error: " +err);
                    result(err, null);
                    return;
                }
                console.log("Votre mention j'aime a été pris en compte " + {id: res.id, ...newLike });
                result(null, {id: res.id, ...newLike});
            }
        )
    })
};

//Find rating with post id
Rating.findByPostId = (post_id) => {
    return new Promise((resolve, reject) => {
        database.query(
            `SELECT * FROM groupomania.rating WHERE post_id=${post_id}`,
            function (error, result) {
                if (error) {
                    reject (error);
                } else {
                    resolve (result);
                }
            }
        )
    })
};

//Cancel rating
Rating.cancelRating = (post_id, user_id) => {
    return new Promise((resolve, reject) => {
        database.query(
            `DELETE FROM groupomania.rating WHERE post_id=${post_id} AND user_id=${user_id}`,
            function (error, result) {
                if (error) {
                    reject (error);
                } else {
                    resolve(result);
                }
            }
        )
    })
};

module.exports = Rating;