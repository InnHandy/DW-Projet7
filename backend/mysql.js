const {Sequelize} = require("sequelize");
require('dotenv').config({path:'./.env'});

const sequelize = new Sequelize(process.env.MYSQL_NAME, process.env.MYSQL_LOGIN, process.env.MYSQL_PASSWORD, {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    dialect: 'mysql'
});

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

module.exports = sequelize;