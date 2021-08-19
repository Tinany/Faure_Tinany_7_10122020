const jsonwebtoken = require('jsonwebtoken');

// DateTime
const moment = require("moment");

const dateTime = moment().format("YYYY-MM-DD HH:mm:ss");

//Models
const Post = require('../models/Post');

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
        creation_date: dateTime,
        user_id: req.body.user_id,
        user_last_name: req.body.user_last_name,
        user_first_name: req.body.user_first_name,
        user_profile_picture: req.body.user_profile_picture
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

//Delete post
exports.deletePost = (req, res, next) => {
    Post.deleteOne(req.params.post_id)
    .then(post => res.status(200).json(post))
    .catch(error => res.status(404).json ({ error }));
};

//Update post
exports.updatePost = (req, res, next) => {
    Post.updateOne(req.params.post_id, (req.body))
    .then(() => res.status(200).json({ message: 'La publication a bien été modifié !'}))
    .catch(error => res.status(404).json({ error }));
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

//Get user post
exports.getUserPosts = (req, res) => {
    Post.findByUser(req.params.user_id)
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(404).json({ error }));
};

//Get number of post by user
exports.countUserPosts = (req, res) => {
    Post.countByUser(req.params.user_id)
    .then(countPosts => res.status(200).json(countPosts))
    .catch(error => res.status(404).json({ error }));
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

//Get all post by update date
exports.getPostsByUpdateDate = (req, res, next) => {
    post.findAllByUpdateDate((err, data) => {
        if(err){
            res.status(500).send({
                message: err.message || "Des erreurs se sont produites",
            });
        }
        res.send(data);
    })
};