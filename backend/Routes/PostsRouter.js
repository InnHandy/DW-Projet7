const express = require('express');
const router = express.Router();
const postsCtrl = require('../Controllers/PostsController');
const auth = require('../middleware/auth');

router.get('/',auth, postsCtrl.getAllPosts);
router.post('/',auth,  postsCtrl.createPost);
router.get('/:id',auth, postsCtrl.getOnePost);
router.post('/:id/like',auth, postsCtrl.likePost);
router.post('/:id/dislike',auth, postsCtrl.dislikePost);
router.post('/:id/likedordisliked',auth, postsCtrl.alreadyLikedOrDislikedPost);
router.put('/:id',auth, postsCtrl.modifyPost);
router.delete('/:id',auth, postsCtrl.deletePost);
module.exports = router;
