const { where } = require("sequelize");
const db = require("../models/");
const getAllPurchasingOrders = async (req, res) => {
  try {
    const purchasingOrders = await db.PurchasingOrder.findAll();
    if (!purchasingOrders || purchasingOrders.length === 0) {
      return res.status(404).json({ message: `no purchasing orders found!` });
    }
    return res.status(201).json({ purchasingOrders });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
};
const getPurchasingOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const purchasingOrder = await db.PurchasingOrder.findOne({
      where: { order_id: id },
    });
    if (!purchasingOrder) {
      return res.status(404).json({
        message: `no purchasing order found with id ${req.params.id}!`,
      });
    }
    return res.status(201).json({ purchasingOrder });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
};
const getreceipts = async (req, res) => {
  try {
    const { id } = req.params;
    const receipts = await db.ReceiptNote.findAll({
      where: { order_id: id },
    });
    if (!receipts) {
      return res.status(404).json({
        message: `no receipts found with id ${req.params.id}!`,
      });
    }
    return res.status(201).json({ receipts });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
};
const getCommand= async (req, res) => {
  try {
    const { id } = req.params;
    const order = await db.PurchasingOrder.findOne({where:{
      order_id : id
    }})
    res.status(200).json(order.command_id)
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
};
const getreceiptById = async (req, res) => {
  try {
    const { id,rid } = req.params;
    const receipt = await db.ReceiptNote.findAll({
      where: { order_id: id , receipt_id:rid },
    });
    if (!receipt) {
      return res.status(404).json({
        message: `no receipts found with id ${req.params.id}!`,
      });
    }
    return res.status(201).json(receipt);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
};
const createPurchasingOrder = async (req, res) => {
  try {
    const {
      supplier_id,
      command_id,
      expected_delivery_date,
      total_price,
      notes,
      chapter_id,
      branch_id,
    } = req.body;
    const purchasingOrder = await db.PurchasingOrder.create({
      command_id: command_id,
      supplier_id: supplier_id,
      expected_delivery_date: expected_delivery_date,
      notes: notes,
      total_price: total_price,
      branch_id: branch_id,
      chapter_id: chapter_id,
    });
    return res.status(201).json(purchasingOrder);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Failed to create purchasing order", error });
  }
  // a refaire
};
const deletePurchasingOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const purchasingOrder = await db.PurchasingOrder.findOne({
      where: { order_id: id },
    });
    if (purchasingOrder) {
      if (!purchasingOrder.status === "pending") {
        return res.status(400).json({
          error: "Cannot delete a purchasing order that is not pending",
        });
      }
      await purchasingOrder.destroy();
      return res
        .status(200)
        .json({ message: "Purchasing order deleted successfully" });
    } else {
      return res.status(404).json({ error: "Purchasing order not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete purchasing order" });
  }
};
const updatePurchasingOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const purchasingOrder = await db.PurchasingOrder.findOne({
    where: { order_id: id },
  });
  if (!purchasingOrder) {
    return res.status(404).json({ message: "Purchasing order not found" });
  }
  if (status) {
    purchasingOrder.status = status;
  }
};
module.exports = {
  getAllPurchasingOrders,
  getPurchasingOrderById,
  createPurchasingOrder,
  deletePurchasingOrder,
  getreceipts,
  getCommand,
  getreceiptById,
  updatePurchasingOrderStatus,
};
