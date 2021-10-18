// Technologies used
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// Express app
const app = express();

// API routes 
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');

// Headers 
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

//Limiter
const  limiter  =  rateLimit ({ 
  windowMs : 15 * 60 * 1000 ,
  max : 100 
});
  
// Data processing
app.use(bodyParser.json());
app.use(helmet());
app.use ('/api/' ,  limiter);

app.use('/api/auth', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);

module.exports = app;