//codes importés
const express = require('express');
const app = express();
require('dotenv').config({path:'./.env'});
const userRoutes = require('./Routes/UsersRouter');
const postRoutes = require('./Routes/Post');
const commentRoutes = require('./Routes/Comment');

//Erreur CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// pour acceder au body lors des requetes POST
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/posts/:id/comments', commentRoutes);


module.exports = app;