Projet 7 Openclassrooms Création d'un réseau social d'entreprise GROUPOMANIA

Contexte
L'entreprise Groupomania a constaté une baisse de motivation des salariés et elle a voulu mettre en place un réseau social d'entreprise pour qu'il y ait une meilleure ambiance et plus d'échanges entre collègues. On avait le choix entre les deux fonctionnalités suivantes : partager un Gif qu'on peut commenter ou partager des liens. Nous avons choisi les dernière option pour ce projet.

Notre mission est donc de contruire les parties frontend et backend.

Dossier Central DW-Projet7
A l'intérieur de ce dossier créez deux dossiers nommés "backend" et "frontend"


Dossier backend :
 
- Terminal Node.js à ouvrir après téléchargement de NODE JS à l'adresse https://nodejs.org/en/download/
cd DW-Projet7\backend
npm install -g nodemon
npm install express  // framework express
npm install sequelize // package pour connecter serveur et base de données mysql
npm install mysql2 
npm install dotenv // mettre en place variables d'environnement
npm install bcrypt // crypter mot de passe
npm install jsonwebtoken // générer un token d'identification
nodemon server // lancer le serveur

Base de données MySQL + connexion sequelize mysql.js
Installer MySQL à partir de https://dev.mysql.com/downloads/installer/ 
Pendant l'installation , notez absolument le Login et le mot de passe utilisés , le Host et le Port vous seront donnés lors de l'installation des packages sequelize et mysql2. Il sera de votre ressort de créer la database dans MySQL Workbench
APP_KEY  // clé pour créer le token. Vous pouvez le définir par vos propres soins
MYSQL_LOGIN // login de connexion à mysql
MYSQL_PASSWORD // mot de passe de connexion à mysql
MYSQL_HOST // host donné par le package sequelize
MYSQL_PORT // port donné par le package sequelize
MYSQL_NAME // nom de la base de données

MySQL Workbench
CREATE DATABASE "nom de la database";
USE "nom de la database";
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `is_Admin` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`));

USE "nom de la database";
DROP TABLE IF EXISTS `posts`;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `link` varchar(100) DEFAULT NULL,
  `title` varchar(100) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `user_id` varchar(100) DEFAULT NULL,
  `posts_nb_like` int DEFAULT NULL,
  `posts_nb_dislike` int DEFAULT NULL,
  `posts_users_like` varchar(100) DEFAULT NULL,
  `posts_users_dislike` varchar(100) DEFAULT NULL,
  `content` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`));

USE "nom de la database";
DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `texte` varchar(100) DEFAULT NULL,
  `post_id` int DEFAULT NULL,
  `user_id` varchar(100) DEFAULT NULL,
  `comments_nb_like` int DEFAULT NULL,
  `comments_nb_dislike` int DEFAULT NULL,
  `comments_users_like` varchar(100) DEFAULT NULL,
  `comments_users_dislike` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`comment_id`));