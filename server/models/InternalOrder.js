module.exports = (sequelize, DataTypes) => {
    const InternalOrder = sequelize.define("InternalOrder", {
      internal_order_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      comment: DataTypes.STRING,
      status: {
        type: DataTypes.ENUM("initialized", "validated", "accepted", "satisfied","printed",'deleted'),
        allowNull: false,
        defaultValue: "initialized",
      },
    });
    InternalOrder.associate = (models) => {
      const { Command} = models;
      Command.hasOne(InternalOrder,{foreignKey :"command_id"})
      InternalOrder.belongsTo(Command, { foreignKey: "command_id",onDelete: 'CASCADE'});
          };
    return InternalOrder
  };