var express = require('express');
var router = express.Router();
const {
    User
} = require('../models');

/* GET users listing. */
router.post('/', async (req, res, next) => {
    const {
        email,
        name,
        password,
        profileImgName,
        status,
        type
    } = req.body;
    try {
        const exUser = await User.findOne({
            where: {
                email
            }
        });
        if (exUser) {
            return res.status(400).send("Already exists email");
        }
        await User.create({
            email,
            name,
            password,
            profileImgName,
            status,
            type
        });
        return res.status(200).send("Signup Success!");

    } catch (error) {
        console.error(error);
        return next(error);
    }

});

module.exports = router;