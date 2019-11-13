module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Save', {
    }, {
      timestamps: true,
      paranoid: true,
    });
  };