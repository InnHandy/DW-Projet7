//codes importés
const mysql = require('mysql');
const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config({path:'./.env'});
//Erreur CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
// pour acceder au body lors des requetes POST
app.use(express.json()); 
//Connexion API et base MySql  
var con = mysql.createConnection({
    host: "process.env.MYSQL_HOST",
    user: "process.env.MYSQL_LOGIN",
    password: "process.env.MYSQL_PASSWORD"
  });
 //création de la database 
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("CREATE DATABASE mabdd", function (err, result) {
        if (err) throw err;
        console.log("Base de données créée !");
      });
  });
// Setup MySQL connection for use
var connection = mysql.createConnection({
    host: "process.env.MYSQL_HOST",
    user: "process.env.MYSQL_LOGIN",
    password: "process.env.MYSQL_PASSWORD",
	database : "mabdd",
  });
// Création table user
  connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    connection.query("CREATE TABLE users (id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,username VARCHAR(100),password VARCHAR(100),email VARCHAR(255) NOT NULL UNIQUE)", function (err, result) {
        if (err) throw err;
        console.log("Table created !");
      });
  });
// Création table posts
  connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    connection.query("CREATE TABLE posts (id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,image BINARY,title VARCHAR(100), created_at DATETIME, user_id VARCHAR(100), nb_like INTEGER, nb_dislike INTEGER)", function (err, result) {
        if (err) throw err;
        console.log("Table posts created !");
      });
  });
// Création table comments
  connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    connection.query("CREATE TABLE comments (id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,texte VARCHAR(100),post_id INTEGER,user_id  VARCHAR(100),nb_like INTEGER,nb_dislike INTEGER)", function (err, result) {
        if (err) throw err;
        console.log("Table comments created !");
      });
  });
// Create user 
app.post('/signup', (req, res,next) => {
	let signupUser = `INSERT INTO users (username, password, email) VALUES ('${req.body.username}', '${req.body.password}', '${req.body.email}')`;
	connection.query(signupUser, (error, result) => {
		if (error) throw res.status(400).json({error});
		console.log("User créé !");
		console.log(result);
		res.status(201).json({message : "Utilisateur créé"})
	});
	next();
});
// Login user
app.post('/login', (req, res,next) => {
	let existingUser = "SELECT * FROM users WHERE email = '${req.body.email}'"
	connection.query(existingUser, (error, result) => {
		if (error) throw res.status(400).json({error});
		console.log("User créé !");
		console.log(result);
		let loginUser = result;
		connection.query(`INSERT INTO users (password, email) VALUES ('${loginUser.password}', '${loginUser.email}')`, (error, result) => {
			if (error) throw error;
			console.log("User logged !");
			console.log(result);
		});
	});
	next();
});

//get all posts

app.get('/', (req, res,next) => {
	let getPosts = "SELECT * FROM posts ORDER BY created_at DESC"
	connection.query(getPosts, (error, result) => {
		if (error) throw error;
		console.log("User créé !");
		console.log(result);
		});
	next();
	});

// get one post
app.get('/:id', (req, res,next) => {
	let getPostsbyId = "SELECT * FROM posts WHERE id = ${req.params.id}"
	connection.query(getPosts, (error, result) => {
		if (error) throw error;
		console.log("User créé !");
		console.log(result);
		});
	next();
	});

// Post posts
app.post('/', (req, res,next) => {
	let addPost = `INSERT INTO posts (image, title, created_at,user_id, nb_like, nb_dislike) VALUES ('${req.body.image}', '${req.body.title}', '${req.body.created_at}', '${req.body.created_at}', '${req.body.user_id}','0','0')`;
	connection.query(addPost, (error, result) => {
		if (error) throw error;
		console.log("User créé !");
		console.log(result);
	});
	next();
});
	

//Delete Posts
app.delete('/:id', (req, res,next) => {
	if (err) throw err;
  var deletePost = "DELETE FROM posts WHERE id = '${req.params.id}'";
  con.query(deletePost, function (err, result) {
    if (err) throw err;
    console.log("Number of records deleted: " + result.affectedRows);
  });
});

// add a comment
app.post('/:id/comments', (req, res,next) => {
	let addComment = `INSERT INTO comments (texte, post_id,user_id, nb_like, nb_dislike) VALUES ('${req.body.texte}', '${req.body.post_id}', '${req.body.user_id}','0','0')`;
	connection.query(addComment, (error, result) => {
		if (error) throw error;
		console.log("User créé !");
		console.log(result);
	});
	next();
});

// GET Comments
app.get('/:id/comments', (req, res,next) => {
	let getPostsbyId = "SELECT * FROM posts WHERE id = ${req.params.id}"
	connection.query(getPosts, (error, result) => {
		if (error) throw error;
		console.log("User créé !");
		console.log(result);
		let getComments = "SELECT * FROM comments WHERE post_id = ${result.post_id}"
		connection.query(getComments, (error, result) => {
			if (error) throw error;
			console.log("User créé !");
			console.log(result);
			});
		});
	next();
	});

// get one comment
app.get('/:id/comments/:id', (req, res,next) => {
	let getPostsbyId = "SELECT * FROM posts WHERE id = ${req.params.id[0]}"
	connection.query(getPostsbyId, (error, result) => {
		if (error) throw error;
		console.log("User créé !");
		console.log(result);
		let getComments = "SELECT * FROM comments WHERE post_id = ${result.post_id}"
		connection.query(getComments, (error, resultbis) => {
			if (error) throw error;
			console.log("User créé !");
			console.log(resultbis);
			let getOneComment = "SELECT * FROM comments WHERE post_id = ${result.post_id}"
			connection.query(getOneComment, (error, resultter) => {
				if (error) throw error;
				console.log("User créé !");
				console.log(resultter);
				});
			});
		});
	next();
	});

// Delete Comments
app.delete('/:id/comments/:id', (req, res,next) => {
	if (err) throw err;
  var deleteComment = "DELETE FROM comments WHERE id = '${req.params.id}'";
  con.query(deleteComment, function (err, result) {
    if (err) throw err;
    console.log("Number of records deleted: " + result.affectedRows);
  });
});

// Like Posts

app.post('/:id/like',(req, res, next) => {
	let getPostsbyId = "SELECT * FROM posts WHERE id = ${req.params.id}"
	connection.query(getPostsbyId, (error, result) => {
		if (error) throw error;
		console.log("User créé !");
		console.log(result);
		let addLike = `INSERT INTO comments (texte, post_id,user_id, nb_like, nb_dislike) VALUES ('${req.body.texte}', '${req.body.post_id}', '${req.body.user_id}','0','0')`;
		connection.query(addPost, (error, result) => {
			if (error) throw error;
			console.log("User créé !");
			console.log(result);
			});
		next();
		});
});
//				 posts.usersLiked.push(req.body.userId)
//				 posts.likes += 1;
				 
				
			  


module.exports = app;