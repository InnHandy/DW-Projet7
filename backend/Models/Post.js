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
        allowNull: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    posts_nb_like: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    posts_nb_dislike: {
        type: DataTypes.INTEGER,
        allowNull: true
    }, 
    posts_users_like: {
        type: DataTypes.STRING,
        allowNull: true,
        get(){
            return this.getDataValue('posts_users_like').split(';')
        },
        set(value){
            this.setDataValue('posts_users_like',value.join(';'));
        },
    },
    posts_users_dislike: {
        type: DataTypes.STRING,
        allowNull: true,
        get(){
            return this.getDataValue('posts_users_like').split(';')
        },
        set(value){
            this.setDataValue('posts_users_like',val.join(';'));
        },
    },

}, {
    tableName: 'posts',
    timestamps: false
});

// `sequelize.define` also returns the model
console.log(Post === sequelize.models.Post); // true
module.exports = Post;