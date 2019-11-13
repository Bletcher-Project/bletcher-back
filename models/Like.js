module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Like",
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "User",
          key: "userId"
        }
      },
      postId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Post",
          key: "postId"
        }
      },
      commentId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Comment",
          key: "commentId"
        }
      }
    },
    {
      timestamps: true,
      paranoid: true
    }
  );
};
