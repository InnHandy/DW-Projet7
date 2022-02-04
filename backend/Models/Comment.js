const { Sequelize, DataTypes } = require('sequelize');
const sequelize  = require('../mysql');

const Comment = sequelize.define('Comment', {
    

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    texte: {
        type: DataTypes.STRING,
        allowNull: false
    },
    post_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    nb_like: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    nb_dislike: {
        type: DataTypes.INTEGER,
        allowNull: false
    }, 

}, {
    tableName: 'posts',
    timestamps: false
});

// `sequelize.define` also returns the model
console.log(Comment === sequelize.models.Comment); // true
module.exports = Comment;