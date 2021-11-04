//Technologies used
const {validationResult, check} = require('express-validator');

exports.checkEmail = [
    check('mail').isEmail().trim(),
    (req, res, next) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(422).json({error: errors.array()})
        }
        next();
    }
]
