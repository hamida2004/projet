module.exports = (sequelize, DataTypes) => {
    const ReceiptNote = sequelize.define("ReceiptNote", {
  receipt_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  delivery_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});
ReceiptNote.associate = (models) => {
  const {PurchasingOrder} = models;
  ReceiptNote.belongsTo(PurchasingOrder, { foreignKey: "order_id" });
  PurchasingOrder.hasMany(ReceiptNote, { foreignKey: "order_id" });
};
return ReceiptNote
}