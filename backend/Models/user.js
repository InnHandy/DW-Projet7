const { Sequelize, DataTypes } = require('sequelize');
const sequelize  = require('../mysql');

const User = sequelize.define('User', {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'users',
    timestamps: false
});

// `sequelize.define` also returns the model
console.log(User === sequelize.models.User); // true
module.exports = User;