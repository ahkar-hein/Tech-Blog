const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/dashboard', withAuth, async (req, res) => {
    try {
      // Get the logged-in user's posts
      const postData = await Post.findAll({
        where: { user_id: req.session.user_id },
        include: [
          {
            model: User,
            attributes: ['name'],
          },
        ],
      });
      const userPosts = postData.map((post) => post.get({ plain: true }));
  
      res.render('dashboard', {
        userPosts,
        logged_in: true,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  

router.post('/addpost', async (req, res) => {
    try {
      const newPost = await Post.create({
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.user_id,
      });
  
      res.status(201).json(newPost);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;
