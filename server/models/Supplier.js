const { type } = require("os");

module.exports = (sequelize, DataTypes) => {
  const Supplier = sequelize.define("Supplier", {
    supplier_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone_num: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    registre_c: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    NIF: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    RIB: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Supplier;
};
