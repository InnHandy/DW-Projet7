const Comment = require('../Models/Comment');
const fs = require('fs');


exports.createComment = async (req, res, next) => {
  const comment = await Comment.create({
    ...JSON.parse(req.body.comment),
    image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`   
  });
  res.status(201).json({ comment}) 
};


exports.getOneComment = async (req, res, next) => {
  const comment = await Comment.findOne({ where: { user_id: req.params.id } });
  res.status(201).json({ comment}); 
};

exports.likeComment = async (req, res, next) => {
  const comment = await Comment.findOne({ where: { user_id: req.params.id } }) 

            if (!comment.comments_users_like.split(';').includes(req.body.user_id) && req.body.like ===1)
            {
              comment.comments_users_like += req.body.user_id ;
               comment.comment_nb_likes += 1;
               res.status(201).json({message : "Post like +1"});
            }

            if (comment.comments_users_like.split(';').includes(req.body.user_id)
             && req.body.like ===0)
            {
              post.posts_users_like += req.body.user_id ;
              post.post_nb_likes += -1;
              res.status(201).json({message : "Post like -1"});
           }

              if (!comment.comments_users_like.split(';').includes(req.body.user_id) && req.body.like ===1)
              {
                comment.comments_users_dislike += req.body.user_id ;
                 post.post_nb_dislikes += 1;
                res.status(201).json({message : "Post dislike +1"});
             }
  
              if (comment.comments_users_like.split(';').includes(req.body.user_id)
              && req.body.like ===0)
             {
               post.posts_users_dislike += req.body.user_id ;
               comment.comment_nb_likes += -1;
                res.status(201).json({message : "Post dislike -1"});
             }

  };


exports.modifyComment = async (req, res, next) => {
  const commentObject = req.file ?
    {
      ...JSON.parse(req.body.comment),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    await commentObject.update();
    res.status(200).json({ message: 'Objet modifié !'}) 
};

exports.deleteComment = async (req, res, next) => {
  const comment = await Comment.findOne({ where: { user_id: req.params.id } }) 
  await comment.destroy();
  const filename = post.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {res.status(200).json({ message: 'Objet supprimé !'})})  
      ;
};

exports.getAllComments = async (req, res, next) => {
  const comments = await Comment.findAll();
    return res.status(200).json(comments);
};
