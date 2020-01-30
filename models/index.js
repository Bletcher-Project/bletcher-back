const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
// const config = require("../config/config")[env];
const config = require("../config/config.json").sqlite[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require("./User")(sequelize, Sequelize);
db.Post = require("./Post")(sequelize, Sequelize);
db.Comment = require("./Comment")(sequelize, Sequelize);
db.HashTag = require("./HashTag")(sequelize, Sequelize);
db.Follow = require("./Follow")(sequelize, Sequelize);
db.Like = require("./Like")(sequelize, Sequelize);
db.Notice = require("./Notice")(sequelize, Sequelize);
db.Save = require("./Save")(sequelize, Sequelize);

db.User.hasMany(db.Post);
db.Post.belongsTo(db.User);

db.Post.hasMany(db.Like);
db.Like.belongsTo(db.Post);
db.User.hasMany(db.Like);
db.Like.belongsTo(db.User);

db.User.hasMany(db.Comment);
db.Comment.belongsTo(db.User);
db.Post.hasMany(db.Comment);
db.Comment.belongsTo(db.Post);

db.Post.belongsToMany(db.HashTag, {
  through: "PostHashTag"
});
db.HashTag.belongsToMany(db.Post, {
  through: "PostHashTag"
});

db.Post.hasMany(db.Save);
db.Save.belongsTo(db.Post);
db.User.hasMany(db.Save);
db.Save.belongsTo(db.User);

db.Comment.hasMany(db.Like);
db.Like.belongsTo(db.Comment);

db.User.belongsToMany(db.User, {
  foreignKey: "senderId",
  as: "Senders",
  through: "Notice"
});
db.User.belongsToMany(db.User, {
  foreignKey: "receiverId",
  as: "Receivers",
  through: "Notice"
});

db.User.belongsToMany(db.User, {
  foreignKey: "followingId",
  as: "Followers",
  through: "Follow"
});
db.User.belongsToMany(db.User, {
  foreignKey: "followerId",
  as: "Followings",
  through: "Follow"
});

module.exports = db;
