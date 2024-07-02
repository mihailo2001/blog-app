const express = require('express');
const router = express.Router();
const { Users } = require('../models');
const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken');

router.post('/', async (req, res) => {
    const { username, password } = req.body;
    bcrypt.hash(password, 10).then((hash) => {
        Users.create({
            username: username,
            password: hash,
        });

        res.json("Success");
    });
});

router.post('/login', async (req, res) => {
    const {username, password} = req.body;

    const user = await Users.findOne({ where: { username: username } });
    if (!user) return res.json({ error: "User not found" });
    
    const match = await bcrypt.compare(password, user.password);
    if(!match) return res.json({error: "Wrong password."});

    const accessToken = sign(
        { username: user.username, id: user.id }, 
        "randomstring"
    );

    res.json(accessToken);
});

module.exports = router;