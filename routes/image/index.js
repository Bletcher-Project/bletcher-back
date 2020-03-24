const express = require("express");
const router = express.Router();
const fs = require("fs");

/* IMAGE Read Router */
router.get("/:category/:imgName", (req, res, next) => {
  try {
    fs.readFile("uploads/" + req.params.category + "/" + req.params.imgName, (error, data) => {
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