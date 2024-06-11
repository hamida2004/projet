module.exports = (sequelize, DataTypes) => {
  const Chapter = sequelize.define("Chapter", {
    chapter_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
  });
  Chapter.associate = (models) => {
    const { Branch } = models;
    Chapter.hasMany(Branch, { foreignKey: 'chapter_id' });
  };
  return Chapter
};
