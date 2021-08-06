//Technologies used
const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');

// Model
const User = require('../models/User');

//Sign up
exports.signup = (req, res, next) => {
  console.log(req.body)
      bcrypt.hash(req.body.password, 10)
        .then(hash => {
          const user = new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
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
            res.send(data);
            console.log(data + 'Le compte a bien été créé');
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
                mail: data.mail
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
        .catch(error => res.status(500).json( error ));
    });
};

//Delete user
exports.deleteUser = (req, res) => {
    User.deleteOne(req.params.user_id)
        .then(() => res.status(200).json({ message: " L'utilisateur a été supprimé ! "}))
        .catch(error => res.status(404).json ({ error }));
};

//Update user
exports.updateUser = (req, res) => {
    User.updateOne(req.params.user_id, (req.body))
    .then(() => res.status(200).json({ message: " L'utilisateur a été modifié ! "}))
    .catch(error => res.status(404).json({ error }));
}

//Get user datas
exports.getUserDatas = (req, res) => {
    let token = req.headers.authorization.split(' ')[1];
    let decodedToken = jsonwebtoken.verify(token, process.env.RANDOM_TOKEN);
    let user_id = JSON.parse(decodedToken.user_id);

    User.findById(user_id)
    .then(user => res.status(200).json(user))
    .catch(error => res.status(404).json({ error }));

}