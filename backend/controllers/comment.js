const Comment = require('../models/Comment');

//Create comment
exports.createComment = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Ce contenu ne doit pas être vide !",
        });
    }
    const comment = new Comment({
        description: req.body.description,
        user_id: req.body.user_id,
        post_id: req.body.post_id
    });
    Comment.create(comment, (err, data) => {
        if (err) {
            res.status(500).send({
                message : err.message || "Des erreurs se sont produites !",
            });
        }
        console.log(data);
        res.send(data);
    });
};

//Get all comment by post id
exports.findAllComments = (req, res) => {
    Comment.findAll(req.params.post_id)
    .then(comments => res.status(200).json(comments))
    .catch(error => res.status(404).json({ error }));
};

//update commment
exports.updateComment = (req, res) => {
    let comment_id = req.params.comment_id;
    let description = JSON.stringify(req.body.description);
    Comment.updateOne(comment_id, description)
    .then(() => res.status(200).json({ message: 'Le commentaire a bien été modifié !'}))
    .catch(error => res.status(404).json({ error }));
};

//Delete comment
exports.deleteOneComment = (req, res) => {
    Comment.deleteOneComment(req.params.comment_id)
    .then(() => res.status(200).json({ message: 'Le commentaire a été supprimé !'}))
    .catch(error => res.status(404).json({ error }));
}

//Get comment by id
exports.findCommentById = (req, res, next) => {
    Comment.findById(req.params.comment_id)
    .then(comment => res.status(200).json(comment))
    .catch(error => res.status(404).json({ error }));
}