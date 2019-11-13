module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Post', {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
          key: 'userId',
        },
      },
      referenceId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'User',
          key: 'userId',
        },
      },
      postImgName: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      
      content: {
        type: DataTypes.STRING(10000),
        allowNull: true,
      },
      tagId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'HashTag',
          key: 'tagId',
        },
      },
    }, {
      timestamps: true,
      paranoid: true,
    });
  };