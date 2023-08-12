const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.post('/addcomment/:postID', withAuth, async (req, res) => {
    try {
      const newComment = await Comment.create({
        comments: req.body.comments,
        user_id: req.session.user_id,
        post_id: req.params.postID
      });
      res.status(201).json(newComment);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;
