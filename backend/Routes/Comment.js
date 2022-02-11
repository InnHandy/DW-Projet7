const express = require('express');
const router = express.Router();
const commentsCtrl = require('../Controllers/Comment');

router.get('/', commentsCtrl.getAllComments);
router.post('/', commentsCtrl.createComment);
router.post('/:comment_id/like', commentsCtrl.likeComment);
router.get('/:comment_id', commentsCtrl.getOneComment);
router.put('/:comment_id',commentsCtrl.modifyComment);
router.delete('/:comment_id',commentsCtrl.deleteComment);
/*
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');


*/

module.exports = router;