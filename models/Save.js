module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Save', {
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
    }, {
      timestamps: true,
      paranoid: true,
    });
  };