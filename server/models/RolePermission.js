module.exports = (sequelize, DataTypes) => {
  const Role_Permission = sequelize.define("Role_Permission", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    role_id: DataTypes.INTEGER,
    permission_id: DataTypes.INTEGER,
  });
  return Role_Permission;
};
