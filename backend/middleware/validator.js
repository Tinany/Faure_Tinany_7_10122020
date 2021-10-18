//Technologies used
const {validationResult, check} = require('express-validator');

exports.checkProfile = [
    check('first_name').isAlpha('fr-FR', {ignore: ' '}),
    check('last_name').isAlpha('fr-FR', {ignore: ' '}),
    check('city').isAlpha('fr-FR', {ignore: ' '}),
    check('profile_picture').isURL({ protocols: ['https'] }),
    (req, res, next) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(422).json({error: errors.array()})
        }
        next();
    }
]

exports.checkPostAndComment = [
    check('description').isAlpha('fr-FR', {ignore: ' '}),
    (req, res, next) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(422).json({error: errors.array()})
        }
        next();
    }
]