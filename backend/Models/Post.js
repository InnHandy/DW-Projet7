const { Sequelize, DataTypes } = require('sequelize');
const sequelize  = require('../mysql');

const Post = sequelize.define('Post', {
    
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    link: {
        type: DataTypes.STRING,
        allowNull: true,
        isUrl: true, 

    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING,
        allowNull: true
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    posts_nb_like: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue : 0,
    },
    posts_nb_dislike: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue : 0,
    }, 
    posts_users_like: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue : '[]',
    },
    posts_users_dislike: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue : '[]',
    },

}, {
    tableName: 'posts',
    timestamps: false
});

// `sequelize.define` also returns the model
console.log(Post === sequelize.models.Post); // true
module.exports = Post;

