const {
  User,
  Sequelize: { Op }
} = require("../../../models");

/*
  Get User
  GET /api/users => get all users
  GET /api/users?id=`id` => get user by id
  GET /api/users?name=`name` => get user by name
  GET /api/users?email=`email` => get user by email
*/
exports.getUser = async (req, res, next) => {
  const id = req.query.id;
  const email = req.query.email;
  const name = req.query.name;
  try {
    if ((id === undefined) & (email === undefined) & (name === undefined)) {
      const exUser = await User.findAll({});
      if (exUser) {
        return res.status(200).json({ allUsers: exUser });
      }
    } else {
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
        return res.status(200).json({ userInfo: exUser });
      } else {
        return res.status(204).json({ exist: 0 });
      }
    }
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

/*
  Post User (Signup)
  POST /api/users
*/
exports.postUser = async (req, res, next) => {
  const { email, name, password, profileImgName, status, type } = req.body;
  const imgpath = req.file ? req.file.filename : null;

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
  Delete User
  Delete /api/users?id=`id` => delete user by id
*/
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
