//Technologies used
const {validationResult, check} = require('express-validator');

exports.checkProfile = [
    check('first_name').not().isEmpty().trim().escape(),
    check('last_name').not().isEmpty().trim().escape(),
    check('city').not().isEmpty().trim().escape(),
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
    check('description').not().isEmpty().trim().escape(),
    (req, res, next) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(422).json({error: errors.array()})
        }
        next();
    }
]