const Comment = require('../Models/Comment');
require('dotenv').config({path:'./.env'});

exports.getAllComments = async (req, res, next) => {

    Comment.findAll({
        order: [
            ['id', 'asc']
        ]
    })
            .then((comments)=> res.status(200).json(comments))
            .catch((error)=> res.status(400).json({error}))
  };

exports.createComment = (req, res, next) => {
    Comment.create({
        texte: req.body.texte,
        post_id : req.body.post_id,
        user_id : req.body.user_id 
    })
    .then( (comment) => res.status(201).json({comment}) )
    .catch((error)=> res.status(400).json({error}))
};

exports.getOneComment = async (req, res, next) => {
    const comment = await Comment.findOne({ where: { comment_id: req.params.comment_id } });//({ where: { user_id: 1 } });
    return res.status(201).json({comment}); 
  };
     
exports.likeComment = async (req, res, next) => {
    Comment.findOne({where: {comment_id: req.params.comment_id}}) //({ where: { user_id: req.params.id } });
        .then((comment) => {
            console.log('salut')
            console.log(comment)
            console.log(typeof comment.comments_users_like)
            let array_of_users_likes =  JSON.parse(comment.comments_users_like)
            console.log(array_of_users_likes)
            console.log(typeof array_of_users_likes)
            let array_of_users_dislikes =  JSON.parse(comment.comments_users_dislike)

            if (req.body.like === 1 && !array_of_users_likes.includes(req.body.user_id)) {
                array_of_users_likes.push(req.body.user_id)
                comment.comments_nb_like += 1;
                comment.comments_users_like = JSON.stringify(array_of_users_likes)
                comment.save()
                res.status(200).json('like !')
            }

            if (req.body.like === 0 && array_of_users_likes.includes(req.body.user_id)) {
                array_of_users_likes.splice(array_of_users_likes.indexOf(req.body.user_id), 1)
                comment.comments_nb_like -= 1;
                comment.comments_users_like = JSON.stringify(array_of_users_likes)
                comment.save()
                res.status(200).json('unlike !')
            }

            if (req.body.like === 0 && array_of_users_dislikes.includes(req.body.user_id)) {

                array_of_users_dislikes.splice(array_of_users_dislikes.indexOf(req.body.user_id), 1)
                comment.comments_nb_dislike -= 1;
                comment.comments_users_dislike = JSON.stringify(array_of_users_dislikes)
                comment.save()
                res.status(200).json('undislike !')
            }

            if (req.body.like === -1 && !array_of_users_dislikes.includes(req.body.user_id)) {
                array_of_users_dislikes.push(req.body.user_id)
                comment.comments_users_dislike += 1;
                comment.comments_users_dislike = JSON.stringify(array_of_users_dislikes)
                comment.save()
                res.status(200).json('dislike !')
            }
        })
        .catch((error) => res.status(400).json({error}))
};

exports.modifyComment = async (req, res, next) => {

    await Comment.update(req.body, { where: { comment_id: req.params.comment_id } });
    Comment.findOne({ where: { comment_id: req.params.comment_id } })
        .then((comment) =>  res.status(200).json(comment))
        .catch((error) => res.status(404).json(error))

};

exports.deleteComment = async (req, res, next) => {
  const comment = await Comment.findOne({ where: { comment_id: req.params.comment_id   } }) //({ where: { user_id: req.params.id } });
  await comment.destroy();
  res.status(201).json({message : "objet supprimé"});
};

