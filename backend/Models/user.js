const { Sequelize, DataTypes } = require('sequelize');
const sequelize  = require('../mysql');

const User = sequelize.define('User', {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        isEmail: true,
    },
    is_Admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue : false,
        allowNull: false
    }
}, {
    tableName: 'users',
    timestamps: false
});

// `sequelize.define` also returns the model
console.log(User === sequelize.models.User); // true
module.exports = User;