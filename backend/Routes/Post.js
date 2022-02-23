const express = require('express');
const router = express.Router();
const postsCtrl = require('../Controllers/Post');
const auth = require('../middleware/auth');

router.get('/', postsCtrl.getAllPosts);
router.post('/',auth,  postsCtrl.createPost);
router.get('/:id', postsCtrl.getOnePost);
router.post('/:id/like', postsCtrl.likePost);
router.post('/:id/dislike', postsCtrl.dislikePost);
router.post('/:id/likedordisliked', postsCtrl.alreadyLikedOrDislikedPost);
router.put('/:id',auth, postsCtrl.modifyPost);
router.delete('/:id',auth, postsCtrl.deletePost);
module.exports = router;
