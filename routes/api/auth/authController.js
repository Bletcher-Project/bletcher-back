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

  try {
    const exUser = await User.findOne({
      where: {
        [Op.or]: [{ email: email }, { name: name }]
      }
    });
    if (exUser) {
      return res.status(400).json({ exist: 1 });
    }

    User.create({
      email,
      name,
      password,
      profileImgName: null,
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

exports.postSignIn = (req, res, next) => {
  res.send("login api is working");
};
// /* POST Sign In */
// exports.postSignIn = (req, res, next) => {
//   console.log("auth!!");
//   passport.authenticate("local", (authError, user, info) => {
//     console.log("auth!!");
//     console.log(user);
//     if (authError) {
//       console.error(authError);
//       return next(authError);
//     }
//     if (!user) {
//       console.log("not user!!");
//       req.flash("signInError", info.message);
//       console.log(info.message);
//       return res.redirect("/");
//     }
//     return req.login(user, signInError => {
//       if (signInError) {
//         console.error(signInError);
//         return next(signInError);
//       }
//       return res.redirect("/");
//     });
//   })(req, res, next);
// };

// /* GET Sign Out */
// exports.getSignOut = (req, res) => {
//   req.logout();
//   req.session.destroy();
//   res.redirect("/");
// };
