module.exports = (sequelize, DataTypes)=> {
  const Role = sequelize.define('Role', {
    role_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING
  });
  Role.associate = (models) => {
    const { User, Permission, UserRole } = models;
    Role.belongsToMany(User, { through: 'User_Role', foreignKey: 'role_id' });
    Role.belongsToMany(Permission, { through: 'Role_Permission', foreignKey: 'role_id' });
  };
  return Role;
}