const { Sequelize, DataTypes } = require('sequelize');
const sequelize  = require('../mysql');

const Comment = sequelize.define('Comment', {
    

    comment_id: {
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
    comments_nb_like: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue : 0,
    },
    comments_nb_dislike: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue : 0,
    }, 
    comments_users_like: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue : [],
    },
    comments_users_dislike: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue : [],
    },

}, {
    tableName: 'comments',
    timestamps: false
});

// `sequelize.define` also returns the model
console.log(Comment === sequelize.models.Comment); // true
module.exports = Comment;