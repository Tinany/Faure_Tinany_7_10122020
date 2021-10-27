// DateTime
const moment = require("moment");

// const dateTime = moment().format("YYYY-MM-DD HH:mm:ss");

//Models
const Post = require('../models/Post')

//Create post
exports.createPost = (req, res, next) => {
    if (!req.body) {
        res.status(400).send({
            message: "Ce contenu ne peut pas être vide !",
        });
    }
    const post = new Post({
        description: req.body.description,
        media: req.body.media,
        // creation_date: dateTime,
        user_id: req.body.user_id
    });
    Post.create(post, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Des erreurs se sont produites !",
            });
        }
        res.status(200).send(data)
    })
};

//Get user posts
exports.getUserPosts = (req, res) => {
    Post.findByUser(req.params.user_id)
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(404).json({ error }));
};

//Get specific post 
exports.getOnePost = (req, res, next) => {
    console.log(req.params.post_id)
    Post.findOne(req.params.post_id, (req.body))
    .then(post => res.status(200).json(post))
    .catch(error => res.status(404).json ({ error }));
};

//Get all post
exports.getPosts = (req, res, next) => {
    Post.findAll((err, data) => {
        if(err){
            res.status(500).send({
                message: err.message || "Des erreurs se sont produites",
            });
        }
        res.send(data);
    })
};

//Update post
exports.updatePost = (req, res, next) => {
    Post.updateOne(req.params.post_id, (req.body))
    .then(() => res.status(200).json({ message: 'La publication a bien été modifié !'}))
    .catch(error => res.status(404).json({ error }));
};

//Delete post
exports.deletePost = (req, res, next) => {
    Post.deleteOne(req.params.post_id)
    .then(post => res.status(200).json(post))
    .catch(error => res.status(404).json ({ error }));
};