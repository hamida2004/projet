module.exports = (sequelize, DataTypes) => {
  const Service = sequelize.define("Service", {
    service_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
  });
  Service.associate = (models) => {
    const { User } = models;
    Service.hasMany(User, { foreignKey: 'service_id'});
  };
  return Service;
};
