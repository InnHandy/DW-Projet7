const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true}
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);

const mysql = require('mysql');

const db = mysql.createConnection({
   host: "localhost",
   user: "nom_utilisateur",
   password: "mot_de_passe_utilisateur"
 });

 db.connect(function(err) {
   if (err) throw err;
   console.log("Connecté à la base de données MySQL!");
  db.query("CREATE DATABASE mabdd", function (err, result) {
       if (err) throw err;
       console.log("Base de données créée !");
     });
 });