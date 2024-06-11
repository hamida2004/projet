const { type } = require("os");

module.exports = (sequelize, DataTypes) => {
  const Product_Command = sequelize.define("Product_Command", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    unit_price :{
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0, // Ensure it's positive or zero
        isInt: true, // Ensure it's an integer
      },
      default: 0,
    },
    quantity :{
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0, // Ensure it's positive or zero
        isInt: true, // Ensure it's an integer
      },
      default: 0,
    },
    delivered_amount: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 0, // Ensure it's positive or zero
        isInt: true, // Ensure it's an integer
      },
      default: 0,
    },
    amount_left: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0, // Ensure it's positive or zero
        isInt: true, // Ensure it's an integer
      },
      default: 0,
    },
    status_quantity: {
      type: DataTypes.ENUM("initialized", "validated", "accepted", "satisfied","deleted"),
      allowNull: false,
      defaultValue: "initialized",
    },
  });
  Product_Command.associate = (models) => {
    const { Command, Product } = models;
    Product_Command.belongsTo(Product, { foreignKey: "product_id" });
    Product_Command.belongsTo(Command, { foreignKey: "command_id" });
  };
  return Product_Command;
};
