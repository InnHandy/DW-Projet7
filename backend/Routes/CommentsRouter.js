const express = require('express');
const router = express.Router();
const commentsCtrl = require('../Controllers/CommentsController');
const auth = require('../middleware/auth');

router.get('/',auth, commentsCtrl.getAllComments);
router.post('/',auth, commentsCtrl.createComment);
router.post('/:comment_id/like',auth, commentsCtrl.likeComment);
router.post('/:comment_id/dislike',auth, commentsCtrl.dislikeComment)
router.get('/:comment_id',auth, commentsCtrl.getOneComment);
router.put('/:comment_id',auth, commentsCtrl.modifyComment);
router.delete('/:comment_id',auth, commentsCtrl.deleteComment);

module.exports = router;