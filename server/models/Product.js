const { type } = require("os");

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    product_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    limit: DataTypes.INTEGER,
    description: {
      type: DataTypes.STRING,
      default: "",
      allowNull: false,
    },
  });
  Product.associate = (models) => {
    const { Product_Command } = models;
    Product.hasMany(Product_Command, { foreignKey: "product_id" });
  };
  return Product;
};
