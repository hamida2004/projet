const db = require("../models/");
const getAllReceiptNotes = async (req, res) => {
  try {
    const receiptNote = await db.ReceiptNote.findAll();
    if (!receiptNote || receiptNote.length === 0) {
      return res.status(404).json({ message: `no receipts found!` });
    }
    return res.status(201).json({ receiptNote });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
};
const getReceiptNoteById = async (req, res) => {
  try {
    const { id } = req.params;
    const receiptNote = await db.ReceiptNote.findOne({
      where: { receiptNote_id: id },
    });
    if (!receiptNote) {
      return res
        .status(404)
        .json({ message: `no receipt found with id ${req.params.id}!` });
    }
    return res.status(201).json({ receiptNote });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
};
const createReceiptNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { deliveryDate, comment, type } = req.body;
    const createdReceiptNote = await db.ReceiptNote.create({
      delivery_date: deliveryDate,
      comment: comment,
      order_id: id,
      type: type,
    });
    return res.status(201).json({ createdReceiptNote });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
};
module.exports = { getAllReceiptNotes, getReceiptNoteById, createReceiptNote };
