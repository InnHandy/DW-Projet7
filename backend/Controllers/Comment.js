const Comment = require('../Models/Comment');
require('dotenv').config({path:'./.env'});

exports.getAllComments = async (req, res, next) => {

    Comment.findAll({
        order: [
            ['comment_id', 'asc']
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
        let array_of_users_likes =  JSON.parse(comment.comments_users_like);
        let array_of_users_dislikes =  JSON.parse(comment.comments_users_dislike);
        if(!array_of_users_likes.includes(req.body.user_id) && !array_of_users_dislikes.includes(req.body.user_id)){
            array_of_users_likes.push(req.body.user_id);
            comment.comments_nb_like += 1;
            comment.comments_users_like = JSON.stringify(array_of_users_likes);
            post.save()
            res.status(200).json('like !')}})
    .catch((error) => res.status(400).json({error})) 
    
        };

        exports.dislikeComment = (req, res, next) => {
            console.log('coucou')
            Post.findOne({where: {comment_id: req.params.comment_id}}) //({ where: { user_id: req.params.id } });
                .then((comment) => {
                    let array_of_users_likes =  JSON.parse(post.posts_users_like);
                    let array_of_users_dislikes =  JSON.parse(post.posts_users_dislike);
                    if(!array_of_users_likes.includes(req.body.user_id) && !array_of_users_dislikes.includes(req.body.user_id)){
                        array_of_users_dislikes.push(req.body.user_id);
                        comment.comments_nb_dislike += 1;
                        comment.comments_users_dislike = JSON.stringify(array_of_users_dislikes);
                        comment.save()
                        res.status(200).json('dislike !')}})
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

