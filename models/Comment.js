module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Comment",
    {
      content: {
        type: DataTypes.STRING(10000),
        allowNull: false
      }
    },
    {
      timestamps: true,
      paranoid: true
    }
  );
};
