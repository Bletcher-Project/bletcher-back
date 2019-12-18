var express = require('express');
var router = express.Router();
const {
  User
} = require('../models');

/* GET users listing. */
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll();
    if (users) {
      res.status(200).json(users);
    } else {
      res.status(400).send("No users exists!");
    }
  } catch (error) {
    console.error(error);
    return next(error);
  }

});

module.exports = router;