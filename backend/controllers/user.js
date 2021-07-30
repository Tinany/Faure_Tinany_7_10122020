//Technologies used
const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');

// Model
const User = require('../models/User');

//Sign-up
exports.signup = (req, res, next) => {
  console.log(req.body)
      bcrypt.hash(req.body.password, 10)
        .then(hash => {
          const user = new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            mail: req.body.mail,
            password: hash
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
exports.login = (req, res, next) => {
      User.findOne({ email: req.body.email })
        .then(user => {
          if (!user) {
            return res.status(401).json({ error: 'Utilisateur non trouvé !' });
          }
          bcrypt.compare(req.body.password, user.password)
            .then(valid => {
              if (!valid) {
                return res.status(401).json({ error: 'Mot de passe incorrect !' });
              }
              res.status(200).json({
                userId: user._id,
                token: jsonwebtoken.sign(
                  { userId: user._id },
                  'klmjpo4zaeM5L3hhivbUIGPIMU7gliYGLg65sefdaGIGhah',
                  { expiresIn: '24h' }
                )
              });
            })
            .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};