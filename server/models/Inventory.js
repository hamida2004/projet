module.exports = (sequelize, DataTypes) => {
    const Inventory = sequelize.define("Inventory", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      product_id: DataTypes.INTEGER,
      qt_physique:DataTypes.INTEGER,
      observation:DataTypes.STRING,
      num_inv:DataTypes.STRING
    });
    Inventory.associate = (models) => {
      const { Branch } = models;
      Inventory.belongsTo(Branch, { foreignKey: 'branch_id' });
    };
    return Inventory;
  };
  