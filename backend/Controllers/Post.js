const Post = require('../Models/Post');
require('dotenv').config({path:'./.env'});

exports.getAllPosts = async (req, res, next) => {

    Post.findAll({
        order: [
            ['id', 'desc']
        ]
    })
            .then((posts)=> res.status(200).json(posts))
            .catch((error)=> res.status(400).json({error}))
  };

exports.createPost = (req, res, next) => {
    Post.create({
        link: req.body.link,
        title : req.body.title,
        user_id : req.body.user_id,
        content: req.body.content
    })
    .then( (post) => res.status(201).json({ post}) )
    .catch((error)=> res.status(400).json({error}))
};

exports.getOnePost =  (req, res, next) => {
    Post.findOne({ where: { id: req.params.id } })//({ where: { user_id: 1 } });
    .then( (post) => res.status(201).json({ post}) )
    .catch((error)=> res.status(400).json({error}))
  };
     
exports.likePost = (req, res, next) => {
    console.log('coucou')
    Post.findOne({where: {id: req.params.id}}) //({ where: { user_id: req.params.id } });
        .then((post) => {
                console.log(post);
                let array_of_users_likes = JSON.parse(post.posts_users_like);
                if (!array_of_users_likes.includes(req.body.user_id)) {
                    array_of_users_likes.push(req.body.user_id);
                    post.posts_nb_like += 1;
                    post.posts_users_like = JSON.stringify(array_of_users_likes);
                    post.save()
                    res.status(200).json('like !')
                }
            })
        .catch((error) => res.status(400).json({error}))

}
                
exports.dislikePost = (req, res, next) => {
    console.log('coucou')
    Post.findOne({where: {id: req.params.id}}) //({ where: { user_id: req.params.id } });
        .then((post) => {
            let array_of_users_dislikes =  JSON.parse(post.posts_users_dislike);
            if(!array_of_users_dislikes.includes(req.body.user_id)){
                array_of_users_dislikes.push(req.body.user_id);
                post.posts_nb_dislike += 1;
                post.posts_users_dislike = JSON.stringify(array_of_users_dislikes);
                post.save()
                res.status(200).json('dislike !')}})
        .catch((error) => res.status(400).json({error})) 
        
};
              
exports.alreadyLikedOrDislikedPost = (req, res, next) => {
    console.log('coucou')
    Post.findOne({where: {id: req.params.id}}) //({ where: { user_id: req.params.id } });
        .then((post) => {
            let array_of_users_likes =  JSON.parse(post.posts_users_like);
            let array_of_users_dislikes =  JSON.parse(post.posts_users_dislike);
            if(array_of_users_likes.includes(req.body.user_id)){
                post.posts_nb_like -= 1;
                array_of_users_likes.splice(array_of_users_likes.indexOf(req.body.user_id),1)
                post.posts_users_like = JSON.stringify(array_of_users_likes);
                post.save()
            }

            if(array_of_users_dislikes.includes(req.body.user_id)) {
                post.posts_nb_dislike -= 1;
                array_of_users_dislikes.splice(array_of_users_dislikes.indexOf(req.body.user_id),1)
                post.posts_users_dislike = JSON.stringify(array_of_users_dislikes);
                post.save()
            }
        })
        .catch((error) => res.status(400).json({error})) 
        
};


exports.modifyPost = async (req, res, next) => {

    await Post.update(req.body, { where: { id: req.params.id } });
    Post.findOne({ where: { id: req.params.id } })
        .then((post) =>  res.status(200).json(post))
        .catch((error) => res.status(404).json(error))

};

exports.deletePost = async (req, res, next) => {
  const post = await Post.findOne({ where: { id: req.params.id  } }) //({ where: { user_id: req.params.id } });
  await post.destroy();
  res.status(201).json({message : "objet supprimé"});
}