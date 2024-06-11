module.exports = (sequelize, DataTypes) => {
    const BranchProduct = sequelize.define("BranchProduct", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      branch_id: DataTypes.INTEGER,
      product_id: DataTypes.INTEGER,
    });
  
    return BranchProduct;
  };
  