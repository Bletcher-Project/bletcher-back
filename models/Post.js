module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Post', {
      postImgName: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING(10000),
        allowNull: true,
      },
    }, {
      timestamps: true,
      paranoid: true,
    });
  };