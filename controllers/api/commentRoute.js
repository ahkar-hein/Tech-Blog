const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/comments', withAuth, async (req, res) => {
    try {
        const userId = req.session.user_id;
      const newComment = await Comment.create({
        ...req.body,
        userId: userId,
      });
      console.log(newComment)
      res.status(201).json(newComment);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;
