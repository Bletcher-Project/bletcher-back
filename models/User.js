module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "User",
    {
      name: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      profileImgName: {
        type: DataTypes.STRING(300),
        allowNull: true
      },
      status: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      type: {
        type: DataTypes.STRING(1),
        allowNull: false
      }
    },
    {
      timestamps: true,
      paranoid: true
    }
  );
};
