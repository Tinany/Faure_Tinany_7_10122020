const database = require('../config/database');

//User constructor
const User = function(user) {
    this.first_name = user.first_name,
    this.last_name = user.last_name,
    this.city = user.city,
    this.profile_picture = user.profile_picture,
    this.mail = user.mail,
    this.password = user.password,
    this.moderator = user.moderator
};

//User creation 
User.create = (newUser, result) => {
    database.query(
        "INSERT INTO groupomania.user SET ?",
        newUser,
        (err, res) => {
            if (err) {
                console.log(' La création utilisateur a échoué ' + err);
                result(err, null);
                return;
            }
            console.log(' La création utilisateur est réussie ');
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

//Delete user
User.deleteOne = (user_id) => {
    return new Promise((resolve, reject) => {
        database.query(
            `DELETE FROM groupomania.user WHERE id=${user_id}`,
             function (error, result) {
                if (error) {
                    reject(error);
                    console.log(error + " L'tilisateur n'a pas été supprimé !");
                } else {
                resolve (result);
                console.log(" L'utilisateur a bien été supprimé ! ");
                }
            }
        )
    })
};

//Update user
User.updateOne = (user_id, user) => {
    return new Promise((resolve, reject) => {
        database.query(
            `UPDATE groupomania.user SET last_name="${user.last_name}", first_name="${user.first_name}", mail="${user.mail}", profile_picture="${user.profile_picture}" WHERE id=${user_id}`,
            function (error, result) {
                if (error) {
                    reject (error);
                    console.log(" La modification a échoué " + error);
                } else {
                    resolve (result);
                    console.log(" L'utilisateur " + {id: user_id } + " a été modifié !");
                }
            }
        )
    })
};

//Find user by id
User.findById = (user_id) => {
    return new Promise((resolve, reject)=> {
        database.query(
            `SELECT * FROM groupomania.user WHERE id=${user_id}`,
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

module.exports = User;