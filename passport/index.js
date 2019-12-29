const local = require("./localStrategy");
const { User } = require("../models");

module.exports = passport => {
  // req.session 객체에 user.id 저장
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // req.user를 통해 로그인한 사용자의 정보를 가져옴 (user.id로 조회)
  passport.deserializeUser((id, done) => {
    User.find({ where: { id } })
      .then(user => done(null, user))
      .catch(err => done(err));
  });

  local(passport);
};
