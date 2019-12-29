const multer = require("multer");
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcrypt");
const passport = require("passport");
const { User } = require("../../../models");

/* code for uploading profile img */
fs.readdir("uploads", error => {
  if (error) {
    console.error("uploads 폴더가 없어 uploads 폴더를 생성합니다.");
    fs.mkdirSync("uploads");
  }
});
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "uploads/");
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(
        null,
        path.basename(file.originalname, ext) + new Date().valueOf() + ext
      );
    }
  }),
  limits: { fileSize: 5 * 1024 * 1024 }
});

/* POST Signup */
// upload.single("img")),
exports.postSignUp = async (req, res, next) => {
  const { email, name, password, profileImgName, status, type } = req.body;
  const imgpath = req.file ? req.file.path : null;

  try {
    const exUser = await User.findOne({
      where: {
        email
      }
    });
    if (exUser) {
      return res.status(400).json({ exist: 1 });
    }

    const saltRounds = 10;

    bcrypt.hash(password, saltRounds, function(err, hash) {
      User.create({
        email,
        name,
        password: hash,
        profileImgName: imgpath,
        status,
        type
      });
    });

    return res.status(200).json({ success: 1 });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

/* POST Sign In */
exports.postSignIn = (req, res) => {
  passport.authenticate("local", (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      req.flash("signInError", info.message);
      return res.redirect("/");
    }
    return req.login(user, signInError => {
      if (signInError) {
        console.error(signInError);
        return next(signInError);
      }
      return res.redirect("/");
    });
  })(req, res, next);
};

/* GET Sign Out */
exports.getSignOut = (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect("/");
};
