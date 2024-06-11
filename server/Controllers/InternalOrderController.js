// internalOrderController.js
const db = require('../models');

// Create a new InternalOrder
exports.createInternalOrder = async (req, res) => {
  try {
    const internalOrder = await db.InternalOrder.create(req.body);
    res.status(201).json(internalOrder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Retrieve all InternalOrders
exports.getAllInternalOrders = async (req, res) => {
  try {
    const internalOrders = await db.InternalOrder.findAll();
    res.status(200).json(internalOrders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Retrieve a single InternalOrder by ID
exports.getInternalOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const internalOrder = await db.InternalOrder.findByPk(id);
    if (!internalOrder) {
      res.status(404).json({ error: 'InternalOrder not found' });
    } else {
      res.status(200).json(internalOrder);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an InternalOrder by ID
exports.updateInternalOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const [updated] = await db.InternalOrder.update(req.body, {
      where: { internal_order_id: id }
    });
    if (updated) {
      const updatedInternalOrder = await db.InternalOrder.findByPk(id);
      res.status(200).json(updatedInternalOrder);
    } else {
      res.status(404).json({ error: 'InternalOrder not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an InternalOrder by ID
exports.deleteInternalOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await db.InternalOrder.destroy({
      where: { internal_order_id: id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'InternalOrder not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getOrdersByStatus = async (req, res) => {
  const { status } = req.params;
  console.log(status)
  try {
    const orders = await db.InternalOrder.findAll({
      where: { status: status }
    });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function to update the status of an order
exports.updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const order = await db.InternalOrder.findByPk(id);
    if (!order) {
      res.status(404).json({ error: 'Order not found' });
    } else {
      await order.update({ status: status });
      res.status(200).json(order);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};