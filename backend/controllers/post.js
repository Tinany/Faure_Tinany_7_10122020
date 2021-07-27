const Post = require('../models/Post');

//Create post
exports.createPost = (req, res, next) => {
    if (!req.body) {
        res.status(400).send({
            message: "Ce contenu ne peut pas être vide !",
        });
    }
    const post = new post({
        description: req.body.description,
        media: req.body.media,
        creation_datePost: req.body.creation_datePost,
        user_id: req.body.user_id
    });
    post.create(post, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Des erreurs se sont produites !",
            });
        }
        res.send(data);
    });
};

//Delete post
exports.deletePost = (req, res, next) => {
    post.deleteOne(req.params.post_id)
    .then(post => res.status(200).json(post))
    .catch(error => res.status(404).json ({ error }));
};

//Update post
exports.updatePost = (req, res, next) => {
    let post  = req.body;
    let post_id = req.params.post_id;
    post.updateOne(post_id, post)
    .then(() => res.status(200).json({ message: 'La publication a bien été modifié !'}))
    .catch(error => res.status(404).json({ error }));
};

//Get all post
exports.getPosts = (req, res, next) => {
    post.findAll((err, data) => {
        if(err){
            res.status(500).send({
                message: err.message || "Des erreurs se sont produites",
            });
        }
        res.send(data);
    })
};

//Get all post by creation date
exports.getPostsByCreationDate = (req, res, next) => {
    post.findAllByCreationDate((err, data) => {
        if(err){
            res.status(500).send({
                message: err.message || "Des erreurs se sont produites",
            });
        }
        res.send(data);
    })
};

//Get all post by modification date
exports.getPostsByModificationDate = (req, res, next) => {
    post.findAllByModificationDate((err, data) => {
        if(err){
            res.status(500).send({
                message: err.message || "Des erreurs se sont produites",
            });
        }
        res.send(data);
    })
};

//Get post by id
exports.getOnePost = (req, res, next) => {
    post.findOne(req.params.id)
    .then(post => res.status(200).json(post))
    .catch(error => res.status(404).json({ error }));
};