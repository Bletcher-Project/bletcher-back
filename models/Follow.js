module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Follow', {
    }, {
      timestamps: true,
      paranoid: true,
    });
  };