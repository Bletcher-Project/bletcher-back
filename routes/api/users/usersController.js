const {
  User,
  Sequelize: { Op }
} = require("../../../models");

/*
  Create user (signup)
  POST /api/users/
*/
exports.createUser = async (req, res, next) => {
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
  Search user by name or email
  GET /api/users?name={...}
  GET /api/users?email={...}
*/
exports.searchUser = async (req, res, next) => {
  const id = req.query.id;
  const email = req.query.email;
  const name = req.query.name;
  console.log("name:" + name);

  try {
    const exUser = await User.findOne({
      where: {
        [Op.or]: [
          { id: id ? id : null },
          { email: email ? email : null },
          { name: name ? name : null }
        ]
      }
    });
    if (exUser) {
      return res.status(400).json({ exist: 1 });
    } else {
      return res.status(200).json({ exist: 0 });
    }
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  const id = req.query.id;

  try {
    const deleteUser = await User.destroy({
      where: { id: id }
    });
    if (deleteUser) {
      return res.status(200).json({ delete: 1 });
    } else {
      return res.status(400).json({ delete: 0 });
    }
  } catch (error) {
    console.error(error);
    return next(error);
  }
};
