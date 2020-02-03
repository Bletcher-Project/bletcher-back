const {
  User,
  Sequelize: { Op }
} = require("../../../models");

/*
  Get User
  GET /api/user/:name
  GET /api/user/:email
*/
exports.getUser = async (req, res, next) => {
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

/*
  Delete User
  ...
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
