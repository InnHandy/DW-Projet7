const Post = require('../Models/Post');
require('dotenv').config({path:'./.env'});

exports.getAllPosts = async (req, res, next) => {
    const posts = Post.findAll()
                    .then(()=>res.status(200).json(posts)) 
                    .catch((error)=> res.status(400).json({error}))  
  };

exports.createPost = (req, res, next) => {
    const post = Post.create({
        link: req.body.link,
        title : req.body.title,
        user_id : req.body.user_id 
    })
    .then( () => res.status(201).json({ post}) )
    .catch((error)=> res.status(400).json({error}))
};

exports.getOnePost = async (req, res, next) => {
    const post = await Post.findOne({ where: { user_id: req.params.id } });//({ where: { user_id: 1 } });
    return res.status(201).json({ post}); 
  };

exports.likePost = async (req, res, next) => {
const post =  Post.findOne({ where: { user_id: 1 } }) //({ where: { user_id: req.params.id } });
.then(()=>{
        
        let tabParsed = JSON.parse(post.posts_users_like);
        let tabbisParsed = JSON.parse(post.posts_users_dislike);

        if (!tabParsed.includes(req.body.user_id) && req.body.like ===1){
        tabParsed.push(req.body.user_id) ;
        post.posts_nb_like += 1;
        post.update(...post)
            .then(()=> res.status(201).json({message : "Post like +1"}))
            .catch((error)=> res.status(400).json({error}));
        post.save()
            .then(()=> res.status(201).json({message : "Post like +1"}))
            .catch((error)=> res.status(400).json({error}));
        };

        if (tabParsed.includes(req.body.user_id) && req.body.like ===0){ 
        for( var i = 0; i < tabParsed.length; i++){ if ( tabParsed[i] === req.body.user_id) { tabParsed.splice(i, 1); }};
        post.posts_nb_like += -1;
        post.update(...post)
            .then(()=> res.status(201).json({message : "Post like -1"}))
            .catch((error)=> res.status(400).json({error}));
        post.save()
            .then(()=> res.status(201).json({message : "Post like -1"}))
            .catch((error)=> res.status(400).json({error}));
        };

        if (!tabbisParsed.includes(req.body.user_id) && req.body.like ===-1){
            tabbisParsed.push(req.body.user_id) ;
            post.posts_nb_dislike += 1;
            post.update(...post)
                .then(()=> res.status(201).json({message : "Post dislike +1"}))
                .catch((error)=> res.status(400).json({error}));
            post.save()
                .then(()=> res.status(201).json({message : "Post dislike +1"}))
                .catch((error)=> res.status(400).json({error}));
        };

        if (tabbisParsed.includes(req.body.user_id) && req.body.like ===0){
            for( var i = 0; i < tabbisParsed.length; i++){ if ( tabbisParsed[i] === req.body.user_id) { tabbisParsed.splice(i, 1); }};
            post.posts_nb_dislike += -1;
            post.update(...post)
                .then(()=> res.status(201).json({message : "Post dislike -1"}))
                .catch((error)=> res.status(400).json({error}));
            post.save()
                .then(()=> res.status(201).json({message : "Post dislike -1"}))
                .catch((error)=> res.status(400).json({error}));
        };
        })
.catch((error)=> res.status(400).json({error}))
};

exports.modifyPost = async (req, res, next) => {
    const post = await Post.findOne({ where: { user_id: 1 } }) //({ where: { user_id: req.params.id } });
    await post.update(...req.body);
    await post.save();
    res.status(201).json({message : "objet modifié"});
};

exports.deletePost = async (req, res, next) => {
  const post = await Post.findOne({ where: { user_id: 1 } }) //({ where: { user_id: req.params.id } });
  await post.destroy();
  res.status(201).json({message : "objet supprimé"});
};

