const { Sequelize, DataTypes } = require('sequelize');
const sequelize  = require('../mysql');

const Post = sequelize.define('Post', {
    
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    image: {
        type: DataTypes.STRING.BINARY,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
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
console.log(Post === sequelize.models.Post); // true
module.exports = Post;