const database = require('../config/database');

// DateTime
const moment = require("moment");

const dateTime = moment().format("YYYY-MM-DD HH:mm:ss");

//User constructor
const User = function(user) {
    this.first_name = user.first_name,
    this.last_name = user.last_name,
    this.city = user.city,
    this.profile_picture = user.profile_picture,
    this.creation_date = user.creation_date,
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
            result(null, {id: res.insertId, ...newUser});
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

//Update user
User.updateOne = (user_id, user) => {
    return new Promise((resolve, reject) => {
        database.query(
            `UPDATE groupomania.user SET last_name="${user.last_name}", first_name="${user.first_name}", city="${user.city}", profile_picture="${user.profile_picture}", modification_date="${dateTime}" WHERE id=${user_id}`,
            function (error, result) {
                if (error) {
                    reject (error);
                    console.log(" La modification a échoué " + error);
                } else {
                    resolve (result);
                    console.log(" L'utilisateur " + { id: user_id } + " a été modifié !");
                }
            }
        )
    })
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

module.exports = User;