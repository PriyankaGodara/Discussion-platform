const express = require('express');
const router = express.Router();
const discussionController = require('../controllers/discussionController');

router.post('/', discussionController.createDiscussion);
router.get('/', discussionController.listDiscussions);
router.get('/search', discussionController.searchDiscussions);
router.put('/:id', discussionController.updateDiscussion);
router.delete('/:id', discussionController.deleteDiscussion);
router.post('/:id/comment', discussionController.commentDiscussion);
router.post('/:id/like', discussionController.likeDiscussion);
router.post('/:id/comment/:commentId/like', discussionController.likeComment);
router.post('/:id/comment/:commentId/reply', discussionController.replyComment);
router.delete('/:id/comment/:commentId', discussionController.deleteComment);
router.put('/:id/comment/:commentId', discussionController.updateComment);
router.post('/:id/view', discussionController.incrementViewCount);

module.exports = router;