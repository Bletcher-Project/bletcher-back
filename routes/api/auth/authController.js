const {
  User,
  Sequelize: { Op }
} = require("../../../models");

/*
  Sign Up
  POST /api/auth/signup
*/
exports.postSignUp = async (req, res, next) => {
  const { email, name, password, profileImgName, status, type } = req.body;
  const imgpath = req.file ? req.file.path : null;

  try {
    const exUser = await User.findOne({
      where: {
        [Op.or]: [{ email: email }, { name: name }]
      }
    });
    if (exUser) {
      return res.status(400).json({ exist: 1 });
    }

    await User.create({
      email,
      name,
      password,
      profileImgName: imgpath,
      status,
      type
    });
    return res.status(200).json({ success: 1 });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

/*
  Sign In
  POST /api/auth/signin
*/
exports.postSignIn = async (req, res, next) => {
  const { id, password } = req.body;

  try {
    const user = await User.authenticate(id, password);
    if (!user) {
      return res
        .status(401)
        .send({ error: "Login failed! Check authentication credentials" });
    }

    const token = await user.authorize();
    return res.status(200).send({ user, token });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

/*
  Check user status with JWT token
  GET /api/auth/check
*/
exports.check = (req, res) => {
  res.json({
    success: true,
    info: req.decoded
  });
};
