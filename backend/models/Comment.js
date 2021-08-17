const database = require('../config/database');

//Constructor
const Comment = function(comment) {
    this.description = comment.description,
    this.user_id = comment.user_id,
    this.post_id = comment.post_id
};

//Comment creation
Comment.create = (newComment, result) => {
    database.query(
        "INSERT INTO groupomania.comment SET ?",
        newComment,
        (err, res) => {
            if (err) {
                console.log("error: " +err);
                result(err, null);
                return;
            }
            console.log("Commentaire bien créé " + {id: res.id, ...newComment });
            result(null, {id: res.id, ...newComment});
        }
    );
};

//Find all comment by post id
Comment.findAll = (post_id) => {
    return new Promise((resolve, reject) => {
        database.query(
            `SELECT * FROM groupomania.comment WHERE post_id=${post_id}`, 
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

//Find all comment by user id
Comment.findAllUserComment = (user_id) => {
    return new Promise((resolve, reject) => {
        database.query(
            `SELECT * FROM groupomania.comment WHERE post_id=${user_id}`, 
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

//Find comment by id 
Comment.findById = (comment_id) => {
    return new Promise((resolve, reject) => {
        database.query(
            `SELECT * FROM groupomania.comment WHERE id=${comment_id}`, 
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

//Update comment
Comment.updateOne = (comment_id, comment_description) => {
    return new Promise((resolve, reject) => {
        database.query(
            `UPDATE groupomania.comment SET decription=${comment_description} WHERE id=${comment_id}`, 
            function (error, result) {
                if (error) { 
                    reject (error);
                    console.log(error)
                } else {
                    resolve (result);
                    console.log('Le commentaire a bien été modifié !')
                }
            }
        )
    })
};

//Delete comment
Comment.deleteOneComment = (comment_id) => {
    return new Promise((resolve, reject) => {
        database.query(
            `DELETE FROM groupomania.comment WHERE id=${comment_id}`,
             function (error, result) {
                if (error) {
                    reject(error);
                    console.log(error);
                } else {
                resolve (result);
                console.log("Le commentaire a été supprimé !");
                }
            }
        )
    })
};

module.exports = Comment;