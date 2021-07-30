const database = require('../config/database');

//User constructor
const User = function(user) {
    this.first_name = user.first_name,
    this.last_name = user.last_name,
    this.city = user.city,
    this.profile_picture = user.profile_picture,
    this.mail = user.mail,
    this.password = user.password
};

//User creation 
User.create = (newUser, result) => {
    database.query(
        "INSERT INTO groupomania.user SET ?",
        newUser,
        (err, res) => {
            if (err) {
                console.log('Création utilisateur échouée' + err);
                result(err, null);
                return;
            }
            console.log('Création utilisateur réussie');
            result(null, {id: res.id, ...newUser});
        }
    );
};

//User login
User.findOne = (mail, result) => {
    database.query(
        "SELECT * FROM groupomania.user WHERE mail=?",
        mail, (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
            result(null, res[0]);
    });
};

module.exports = User;