module.exports = (sequelize, DataTypes) => {
  const User_Role = sequelize.define('User_Role', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });

  User_Role.associate = (models) => {
    const { User, Role } = models;

    User_Role.belongsTo(User, { foreignKey: 'user_id' });
    User_Role.belongsTo(Role, { foreignKey: 'role_id' });
  };

  return User_Role;
};
