const express = require('express');
const router = express.Router();
const postsCtrl = require('../Controllers/Post');

router.get('/', postsCtrl.getAllPosts);
router.post('/',  postsCtrl.createPost);
router.get('/:id', postsCtrl.getOnePost);
router.post('/:id/like', postsCtrl.likePost);
router.put('/:id', postsCtrl.modifyPost);
router.delete('/:id', postsCtrl.deletePost);
module.exports = router;
/*
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

*/