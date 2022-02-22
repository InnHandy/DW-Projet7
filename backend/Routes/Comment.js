const express = require('express');
const router = express.Router();
const commentsCtrl = require('../Controllers/Comment');
const auth = require('../middleware/auth');

router.get('/',auth, commentsCtrl.getAllComments);
router.post('/', commentsCtrl.createComment);
router.post('/:comment_id/like',auth, commentsCtrl.likeComment);
router.get('/:comment_id',auth, commentsCtrl.getOneComment);
router.put('/:comment_id',auth, commentsCtrl.modifyComment);
router.delete('/:comment_id',auth, commentsCtrl.deleteComment);

module.exports = router;