const Post = require('../Models/Post');
const fs = require('fs');


exports.createPost = (req, res, next) => {
  const post = await Post.create({
    ...JSON.parse(req.body.post),
    image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        
  });
  res.status(201).json({ post})
   
};


exports.getOnePost = (req, res, next) => {
  const post = await Post.findOne({ where: { user_id: req.params.id } }) 
};

exports.likePost = (req, res, next) => {
  const post = await Post.findOne({ where: { user_id: req.params.id } }) 

            if (!post.usersLiked.includes(req.body.userId) && req.body.like ===1)
            {
              Sauces.updateOne(
                {_id: req.params.id},
                {
                  /*
               sauce.usersLiked.push(req.body.userId)
               sauce.likes += 1;
               Sauces.updateOne(
                   {_id: req.params.id},
                   ...sauce
               )*/
                  $inc : {likes : 1},
                  $push : {usersLiked : req.body.userId}
                },
              )
              .then(()=> res.status(201).json({message : "Sauce like +1"}))
              .catch((error)=> res.status(400).json({error}))
            }

            if (sauce.usersLiked.includes(req.body.userId) && req.body.like ===0)
            {
              Sauces.updateOne(
                {_id: req.params.id},
                {
                  $inc : {likes : -1},
                  $pull : {usersLiked : req.body.userId}
                },
              )
              .then(()=> res.status(201).json({message : "Sauce like -1"}))
              .catch((error)=> res.status(400).json({error}))
              }

              if (!sauce.usersDisliked.includes(req.body.userId) && req.body.like ===-1)
              {
                Sauces.updateOne(
                  {_id: req.params.id},
                  {
                    $inc : {dislikes : 1},
                    $push : {usersDisliked : req.body.userId}
                  },
                )
                .then(()=> res.status(201).json({message : "Sauce dislike +1"}))
                .catch((error)=> res.status(400).json({error}))
              }
  
              if (sauce.usersDisliked.includes(req.body.userId) && req.body.like==0)
              {
                Sauces.updateOne(
                  {_id: req.params.id},
                  {
                    $inc : {dislikes : -1},
                    $pull : {usersDisliked : req.body.userId}
                  },
                )
                .then(()=> res.status(201).json({message : "Sauce dislike -1"}))
                .catch((error)=> res.status(400).json({error}))
                }

  };


exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  sauces.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
  Sauces.findOne({ _id: req.params.id })
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        sauces.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

exports.getAllSauces = (req, res, next) => {
  Sauces.find().then(
    (sauces) => {
      res.status(200).json(sauces);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};