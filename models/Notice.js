module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Notice', {
      senderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
          key: 'userId',
        },
      },
      receiverId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
          key: 'userId',
        }, 
      },
      message: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      isChecked: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    }, {
      timestamps: true,
      paranoid: true,
    });
  };