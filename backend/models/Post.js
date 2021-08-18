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

//Update post
Post.updateOne = (postId, post) => {
    return new Promise((resolve, reject) => {
        database.query(
            `UPDATE groupomania.post SET description="${post.description}", media="${post.media}" WHERE id="${post.id}"`,
            function (error, result) {
                if (error) {
                    reject (error);
                    console.log("error :" + error);
                } else {
                    resolve (result);
                    console.log("La publication " + {id: postId, ...Post} + "a bien été modifié !");
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

//Find post by user id
Post.findByUser = (user_id) => {
    return new Promise ((resolve, reject) => {
        database.query(
            `SELECT * FROM groupomania.post WHERE user_id=${user_id}`,
            function (error, result) {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        )
    })
};

// Count Post 
Post.countByUser = (user_id) => {
    return new Promise ((resolve, reject) => {
        database.query(
            `SELECT COUNT(*) FROM groupomania.post WHERE user_id=${user_id}`,
            function (error, result) {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        )
    })
};

//Get user name 
Post.findDatasOfUser = (user_id) => {
    return new Promise ((resolve, reject) => {
        database.query(
            `SELECT first_name, last_name, profile_picture FROM groupomania.user INNER JOIN groupomania.post ON user.id = post.user_id LIMIT 1`,
            function (error, result) {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        )
    })
};

//Find all post
Post.findAll = (result) => {
    database.query(
        "SELECT * FROM groupomania.post ORDER BY id DESC", (err, res) => {
            if (err) {
                result(err, null);
                return;
            } else {
                result(null, {post: res});
            }
        }
    )
};

//Find all post with creation date
Post.findAllByCreationDate = (result) => {
    database.query(
        "SELECT * FROM groupomania.post ORDER BY creation_date DESC", (err, res) => {
            if (err) {
                result(err, null);
                return;
            } else {
                result(null, {post: res});
            }
        }
    )
};

//Find all post with update date
Post.findAllByUpdateDate = (result) => {
    database.query(
        "SELECT * FROM groupomania.post ORDER BY modification_date DESC", (err, res) => {
            if (err) {
                result(err, null);
                return;
            } else {
                result(null, {post: res});
            }
        }
    )
};

module.exports = Post;