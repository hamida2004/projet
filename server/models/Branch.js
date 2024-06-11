module.exports = (sequelize, DataTypes) => {
  const Branch = sequelize.define("Branch", {
    branch_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    VAT:DataTypes.INTEGER,
  });
  Branch.associate = (models) => {
    const { Chapter } = models;
    Branch.belongsTo(Chapter, { foreignKey: 'chapter_id' });
  };

  return Branch;
};
