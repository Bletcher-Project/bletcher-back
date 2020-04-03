module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Post",
    {
      postImgName: {
        type: DataTypes.STRING(300),
        allowNull: false
      },
      postImgWidth: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      postImgHeight: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      content: {
        type: DataTypes.STRING(10000),
        allowNull: true
      }
    },
    {
      timestamps: true,
      paranoid: true
    }
  );
};
