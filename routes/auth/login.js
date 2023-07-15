const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { getDb } = require('../../mongoUtil');

router.post('/', async (req, res) => {
    try {
        const users = getDb().collection('users');
        const user = await users.findOne({ _id: req.body.username }, { projection: { password: 1 } });
        if (!user) throw 400;

        if (await bcrypt.compare(req.body.password, user.password)) {
            const token = jwt.sign({ username: user._id }, process.env.LOGIN_KEY, { expiresIn: "15m" });
            res.status(200).send({ username: user._id, token });
        } else { throw 403 }
    } catch (e) {
        let code = 500, message = e.message;
        if (e == 400) { code = e, message = "User not found" }
        if (e == 403) { code = e, message = "Incorrect password" }
        res.status(code).send(message);
    }
});

module.exports = router;