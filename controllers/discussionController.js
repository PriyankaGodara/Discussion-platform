const Discussion = require('../models/Discussion');
const Comment = require('../models/Comment');

//create a new discussion
exports.createDiscussion = async (req,res) => {
    const { text, image, hashtags, createdBy } = req.body;

    try{
        const discussion = new Discussion({
            text,
            image,
            hashtags,
            createdBy
        });

        await discussion.save();
        res.json(discussion);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

//Get list of discussion
exports.listDiscussions = async (req,res) => {
    try{
        
        const discussions = await Discussion.find().populate('createdBy', 'name').populate('comments');
        res.json(discussions);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

//Search discussions by hashtags or text
exports.searchDiscussions = async (req,res) => {
    const { query } = req.query;

    try{
        const discussions = await Discussion.find({
            $or: [
                { text: { $regex: query, $options: 'i' }},
                { hashtags: { $regex: query, $options: 'i' }}
            ]
        }).populate('createdBy', 'name');
        res.json(discussions);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

//update a discussion
exports.updateDiscussion = async (req, res) => {
    const { text, image, hashtags } = req.body;

    try {
        const discussion = await Discussion.findById(req.params.id);
        if (!discussion) {
            return res.status(404).json({ msg: 'Discussion not found' });
        }

        discussion.text = text || discussion.text;
        discussion.image = image || discussion.image;
        discussion.hashtags = hashtags || discussion.hashtags;

        await discussion.save();
        res.json(discussion);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Delete a discussion
exports.deleteDiscussion = async (req, res) => {
    try {
        const discussion = await Discussion.findById(req.params.id);
        if (!discussion) {
            return res.status(404).json({ msg: 'Discussion not found' });
        }

        await discussion.deleteOne();
        res.json({ msg: 'Discussion removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};


// Comment on a discussion
exports.commentDiscussion = async (req, res) => {
    const { text, createdBy } = req.body;

    try {
        const discussion = await Discussion.findById(req.params.id);
        if (!discussion) {
            return res.status(404).json({ msg: 'Discussion not found' });
        }

        const comment = new Comment({
            text,
            createdBy
        });

        await comment.save();
        discussion.comments.push(comment.id);
        await discussion.save();

        res.json(comment);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Like a discussion
exports.likeDiscussion = async (req, res) => {
    try {
        const discussion = await Discussion.findById(req.params.id);
        if (!discussion) {
            return res.status(404).json({ msg: 'Discussion not found' });
        }

       /* if(!discussion.likes){
            discussion.likes = [];
        }*/

        if (discussion.likes.some(like => like.toString() === req.body.userId)) {
            return res.status(400).json({ msg: 'Already liked' });
        }

        discussion.likes.push(req.body.userId);
        await discussion.save();

        res.json({ msg: 'Discussion liked' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Like a comment
exports.likeComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
        if (!comment) {
            return res.status(404).json({ msg: 'Comment not found' });
        }
     
     /*   if(!comment.likes){
            comment.likes = [];
        }*/


        if (comment.likes.some(like => like.toString() === req.body.userId)) {
            return res.status(400).json({ msg: 'Already liked' });
        }

        comment.likes.push(req.body.userId);
        await comment.save();

        res.json({ msg: 'Comment liked' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Reply to a comment
exports.replyComment = async (req, res) => {
    const { text, createdBy } = req.body;

    try {
        const parentComment = await Comment.findById(req.params.commentId);
        if (!parentComment) {
            return res.status(404).json({ msg: 'Comment not found' });
        }

        const reply = new Comment({
            text,
            createdBy
        });

        await reply.save();
        parentComment.replies.push(reply.id);
        await parentComment.save();

        res.json(reply);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Delete a comment
exports.deleteComment = async (req, res) => {
    try {
        await Comment.findByIdAndDelete(req.params.commentId);
        res.json({ msg: 'Comment removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Update a comment
exports.updateComment = async (req, res) => {
    const { text } = req.body;

    try {
        const comment = await Comment.findById(req.params.commentId);
        if (!comment) {
            return res.status(404).json({ msg: 'Comment not found' });
        }

        comment.text = text || comment.text;
        await comment.save();
        res.json(comment);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Increment view count
exports.incrementViewCount = async (req, res) => {
    try {
        const discussion = await Discussion.findById(req.params.id);
        if (!discussion) {
            return res.status(404).json({ msg: 'Discussion not found' });
        }

        discussion.viewCounts += 1;
        await discussion.save();

        res.json({ viewCounts: discussion.viewCounts });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};