module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Notice",
    {
      // id: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      //   autoIncrement: true,
      //   primaryKey: true,
      // },
      message: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      isChecked: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      }
    },
    {
      timestamps: true,
      paranoid: true
    }
  );
};
