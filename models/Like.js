module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Like",
    {

    },
    {
      timestamps: true,
      paranoid: true
    }
  );
};
