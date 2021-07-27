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

//Delete one post
Post.deleteOne = (postId) => {
    return new Promise((resolve, reject) => {
        database.query(
            `DELETE FROM groupomania.post WHERE id=${post.id}`,
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

//Post update
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
                    console.log("La publication " + {id: post.id, ...Post} + "a bien été modifié !");
                }
            }
        )
    })
};

//Find all post
Post.findAll = (result) => {
    database.query(
        "SELECT * FROM groupomania.post", (err, res) => {
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
Post.findAllByCreatedAt = (result) => {
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
Post.findAllByUpdatedAt = (result) => {
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