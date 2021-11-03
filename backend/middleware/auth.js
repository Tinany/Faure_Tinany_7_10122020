//Technologies used
const jsonwebtoken = require('jsonwebtoken');

//Export 
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jsonwebtoken.verify(token, process.env.RANDOM_TOKEN);
    console.log(decodedToken)
    const user_id = decodedToken.id;
    /*if (req.body.user_id && req.body.user_id !== user_id) {
      throw 'Invalid user ID';
    } else {*/
      next();
    //}
  } catch (err) {
    console.log(err);
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};