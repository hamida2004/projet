module.exports = (sequelize, DataTypes) => {
  const Command = sequelize.define("Command", {
    command_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    type:{
      type: DataTypes.ENUM("internal","external"),
      allowNull: false,
      defaultValue: "internal",
    
    }
  });
  Command.associate = (models) => {
    const { User, Product_Command } = models;

    Command.belongsTo(User, { foreignKey: 'user_id' });
    Command.hasMany(Product_Command, { foreignKey: 'command_id' });
  };
  return Command
};
