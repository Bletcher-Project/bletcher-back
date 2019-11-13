module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Like', {
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Post',
            key: 'postId',
        },
      },
      userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
              model: 'User',
              key: 'userId',
          },
      },
      commentId: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
              model: 'Comment',
              key: 'commentId',
          },
      },
    }, {
      timestamps: true,
      paranoid: true,
    });
  };