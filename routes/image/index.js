const express = require("express");
const router = express.Router();
const fs = require("fs");


/* IMAGE Read Router 
  GET image/post?=abc.jpg
  GET image/profile?=xyz.jpg
*/
router.get("/", (req, res, next) => {
  const post = req.query.post ? req.query.post : null;
  const profile = req.query.profile ? req.query.profile : null;
  try {
    let path = "";
    if (post === null) {
      path = "uploads/profile/".concat(profile);
    } else if (profile === null) {
      path = "uploads/post/".concat(post);
    } else {
      return res.status(404).send("Not Found");
    }
    fs.readFile(path, (error, data) => {
      if (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
      }
      return res.status(200).end(data);
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

module.exports = router;
