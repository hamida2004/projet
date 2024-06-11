module.exports = (sequelize, DataTypes) => {
  const ServiceHead = sequelize.define("ServiceHead", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    service_id: {
      type: DataTypes.INTEGER,
    },
    user_id: DataTypes.INTEGER,
  });
  return ServiceHead;
};
