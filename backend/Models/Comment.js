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
        allowNull: false
    },
    comments_nb_dislike: {
        type: DataTypes.INTEGER,
        allowNull: false
    }, 
    comments_users_like: {
        type: DataTypes.STRING,
        allowNull: false,
        get(){
            return this.getDataValue('comments_users_like').split(';')
        },
        set(value){
            this.setDataValue('comments_users_like',val.join(';'));
        },
    },
    comments_users_dislike: {
        type: DataTypes.STRING,
        allowNull: false,
        get(){
            return this.getDataValue('comments_users_like').split(';')
        },
        set(value){
            this.setDataValue('comments_users_like',value.join(';'));
        },
    },

}, {
    tableName: 'comments',
    timestamps: false
});

// `sequelize.define` also returns the model
console.log(Comment === sequelize.models.Comment); // true
module.exports = Comment;