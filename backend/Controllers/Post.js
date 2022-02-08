const Post = require('../Models/Post');
const fs = require('fs');
require('dotenv').config({path:'./.env'});


exports.createPost = async (req, res, next) => {
  const post = await Post.create({
    image: `${req.protocol}://${req.get('process.env.MYSQL_HOST')}/images/${req.file.filename}` ,
    title : req.body.title,
    user_id : req.params.id ,
    posts_nb_dislike : '0',
    post_nb_likes : '0',
  });
  res.status(201).json({ post});
  next();
};


exports.getOnePost = async (req, res, next) => {
  const post = await Post.findOne({ where: { user_id: req.params.id } });
  return res.status(201).json({ post}); 
};

exports.likePost = async (req, res, next) => {
  const post = await Post.findOne({ where: { user_id: req.params.id } }) 

            if (!post.posts_users_like.split(';').includes(req.body.user_id) && req.body.like ===1)
            {
              post.posts_users_like += req.body.user_id ;
               post.post_nb_likes += 1;
               res.status(201).json({message : "Post like +1"});
            }

            if (post.posts_users_like.split(';').includes(req.body.user_id)
             && req.body.like ===0)
            {
              post.posts_users_like += req.body.user_id ;
              post.post_nb_likes += -1;
              res.status(201).json({message : "Post like -1"});
           }

              if (!post.posts_users_like.split(';').includes(req.body.user_id) && req.body.like ===1)
              {
                post.posts_users_dislike += req.body.user_id ;
                 post.post_nb_dislikes += 1;
                res.status(201).json({message : "Post dislike +1"});
             }
  
              if (post.posts_users_like.split(';').includes(req.body.user_id)
              && req.body.like ===0)
             {
               post.posts_users_dislike += req.body.user_id ;
               post.post_nb_likes += -1;
                res.status(201).json({message : "Post dislike -1"});
             }

  };


exports.modifyPost = async (req, res, next) => {
  const postObject = req.file ?
    {
      ...JSON.parse(req.body.post),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    await postObject.update();
    res.status(200).json({ message: 'Objet modifié !'}) 
};

exports.deletePost = async (req, res, next) => {
  const post = await Post.findOne({ where: { user_id: req.params.id } }) 
  await post.destroy();
  const filename = post.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {res.status(200).json({ message: 'Objet supprimé !'})})  
      ;
};

exports.getAllPosts = async (req, res, next) => {
  const posts = await Post.findAll();
    return res.status(200).json(posts);
};
