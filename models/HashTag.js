module.exports = (sequelize, DataTypes) => (
    sequelize.define('HashTag', {
      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
    }, {
      timestamps: true,
      paranoid: true,
    })
  );