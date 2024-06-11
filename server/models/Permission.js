module.exports = (sequelize, DataTypes)=> {
  const Permission = sequelize.define('Permission', {
    permission_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: DataTypes.STRING
  });
  Permission.associate = (models) => {
    const { Role } = models;
    Permission.belongsToMany(Role, { through: 'Role_Permission', foreignKey: 'permission_id' });
  };
  return Permission
}