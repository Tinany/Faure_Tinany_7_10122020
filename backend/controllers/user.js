//Technologies used
const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');

// DateTime
const moment = require("moment");

const dateTime = moment().format("YYYY-MM-DD HH:mm:ss");

// Model
const User = require('../models/User');

//Sign up
exports.signup = (req, res) => {
    console.log(req.body)
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                city: req.body.city,
                creation_date: dateTime,
                mail: req.body.mail,
                password: hash,
                moderator: 0
            });

            User.create(user, (err, data) => {
            if (err) {
                if (err.code == 'ER_DUP_ENTRY') {
                    return res.status(401).json({ error: 'Cet utilisateur existe déjà' });
                }
            }
            res.status(200).json({
                ...data,
                token: jsonwebtoken.sign(
                data,
                process.env.RANDOM_TOKEN,
                { expiresIn: '24h' }
                )
            })
            console.log(data, 'Le compte a bien été créé');
        });
    })
    .catch(error => res.status(500).json( error ));
};

//Log in
exports.login = (req, res) => {
    User.findOne(req.body.mail, (error, data) => {
        if(!data){
            return res.status(401).json({error: 'Utilisateur incorrect'});
        }
        bcrypt.compare(req.body.password, data.password)
        .then(isValid => {
            if(!isValid){
                return res.status(401).json({error: 'Mot de passe incorrect'});
            };
            const payload = {
                id: data.id,
                mail: data.mail,
                first_name: data.first_name,
                last_name: data.last_name,
                city: data.city,
                creation_date: data.creation_date,
                profile_picture: data.profile_picture
            }
            res.status(200).json({
                ...payload,
                token: jsonwebtoken.sign(
                payload,
                process.env.RANDOM_TOKEN,
                { expiresIn: '24h' }
                )
            })
        })
        .catch(error => res.status(500).json(error));
    });
};

//Update user
exports.updateUser = (req, res) => {
    User.updateOne(req.params.user_id, (req.body))
    .then(() => res.status(200).json({ message: " L'utilisateur a été modifié ! "}))
    .catch(error => res.status(404).json({ error }));
};

//Delete user
exports.deleteUser = (req, res) => {
    User.deleteOne(req.params.user_id)
        .then(() => res.status(200).json({ message: " L'utilisateur a été supprimé ! "}))
        .catch(error => res.status(404).json ({ error }));
};