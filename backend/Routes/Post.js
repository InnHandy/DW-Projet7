const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const postsCtrl = require('../controllers/Post');


router.get('/',auth, postsCtrl.getAllPosts);
router.post('/', auth, multer,  postsCtrl.createPost);
router.post('/:id/like', auth, multer,  postsCtrl.likePost);
router.get('/:id',auth,  postsCtrl.getOnePost);
router.put('/:id',auth, multer,  postsCtrl.modifyPost);
router.delete('/:id',auth,  postsCtrl.deletePost);
module.exports = router;