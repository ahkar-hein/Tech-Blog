const router = require('express').Router();
// const { Model } = require('sequelize');
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

// get request for getting all post associated by logged in user
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

// update the user's post with post id (params)
router.put('/edit/:id', withAuth, async (req, res) => {
  try {
    const postId = req.params.id;
    const { title, content } = req.body; //title and content from body textbox.

    // Use the update method to perform the force update
    const updatedPost = await Post.update(
      { title, content },
      {
        where: { id: postId },
        individualHooks: true 
      }
    );

    if (updatedPost[0] === 0) {
      return res.status(404).json({ message: 'No post found with this ID' });
    }

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});
// delete route for user's post
router.delete('/posts/:id', withAuth, async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);

    if (!post) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }

    // Check if the logged-in user is the owner of the post
    if (post.user_id !== req.session.user_id) {
      res.status(403).json({ message: 'You are not authorized to delete this post' });
      return;
    }

    await post.destroy();

    res.status(204).end();
  } catch (err) {
    res.status(500).json(err);
  }
});
// post route for create new post
router.post('/addpost', withAuth, async (req, res) => {
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
