const database = require('../config/database');

//Constructor
const Post = function(post) {
    this.description = post.description,
    this.media = post.media,
    this.user_id = post.user_id
};

//Post creation
Post.create = (newPost, result) => {
    database.query(
        "INSERT INTO groupomania.post SET ?",
        newPost,
        (err, res) => {
            if (err) {
                console.log("error: " + err);
                result(err, null);
                return;
            }
            console.log("Publication crée" + {id: res.id, ...newPost });
            result(null, {id: res.id, ...newPost});
        }
    );
};

// Get specific post 
Post.findOne = (post_id) => {
    return new Promise((resolve, reject) => {
        database.query(
            `SELECT p.id AS post_id, p.media, p.description, u.id as user_id, u.first_name, u.last_name, u.profile_picture FROM groupomania.post AS p INNER JOIN user AS u ON p.user_id = u.id  WHERE p.id='${post_id}'`,
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

//Find all post
Post.findAll = (result) => {
    database.query(
        "SELECT p.id AS post_id, p.media, p.description, u.id as user_id, u.first_name, u.last_name, u.profile_picture " + 
        "FROM groupomania.post AS p " + 
        "INNER JOIN user AS u ON p.user_id = u.id " +
        "ORDER BY p.id DESC", (err, res) => {
            if (err) {
                result(err, null);
                return;
            } else {
                result(null, {post: res});
            }
        }
    )
};

//Update post
Post.updateOne = (post_id, post) => {
    return new Promise((resolve, reject) => {
        database.query(
            `UPDATE groupomania.post SET description="${post.description}", media="${post.media}" WHERE id=${post_id}`,
            function (error, result) {
                if (error) {
                    reject (error);
                    console.log("error :" + error);
                } else {
                    resolve (result);
                    console.log("La publication " + { id: post_id } + "a bien été modifié !");
                }
            }
        )
    })
};

//Delete one post
Post.deleteOne = (post_id) => {
    return new Promise((resolve, reject) => {
        database.query(
            `DELETE FROM groupomania.post WHERE id=${post_id}`,
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


module.exports = Post;