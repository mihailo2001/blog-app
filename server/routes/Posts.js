const express = require('express');
const router = express.Router();
const { Posts, Likes } = require('../models');
const { validateToken } = require('../middlewares/AuthMiddleware');

router.get('/', validateToken, async (req, res) => {
    const listOfPosts = await Posts.findAll({ include: [Likes] });
    const likedPosts = await Likes.findAll({ where: { UserId: req.user.id }})
    res.json({listOfPosts: listOfPosts, likedPosts: likedPosts});
});

router.get('/byId/:id', async (req, res) => {
    const id = req.params.id;
    const post = await Posts.findByPk(id);
    res.json(post);
});

router.post('/', validateToken, async (req, res) => {
    const post = req.body;
    post.username = req.user.username;
    await Posts.create(post);
    res.send(post);
});

router.delete("/:id", validateToken, async (req, res) => {
    const postId = req.params.id;

    await Posts.destroy({
        where: {
            id: postId,
        },
    });
    res.json('Post deleted');
});

module.exports = router;
