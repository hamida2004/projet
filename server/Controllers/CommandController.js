const db = require("../models");

const getCommands = async (req, res) => {
  try {
    const commands = await db.Command.findAll();
    if (!commands || commands.length === 0) {
      return res.status(404).json({ message: "No commands found" });
    }
    return res.status(200).json(commands);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getExternalCommands = async (req, res) => {
  try {
    const commands = await db.Command.findAll({
      where: {
        type: "external",
      },
    });
    if (!commands || commands.length === 0) {
      return res.status(404).json({ message: "No commands found" });
    }
    return res.status(200).json(commands);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getCommandById = async (req, res) => {
  try {
    const { id } = req.params;
    const command = await db.Command.findOne({ where: { command_id: id } });
    if (command) {
      return res.status(200).json(command);
    }
    return res.status(404).send("Command with the specified ID does not exist");
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const createCommand = async (req, res) => {
  try {
    const { user_id, type } = req.body;
    const command = await db.Command.create({ user_id: user_id, type: type });
    return res.status(201).json(command);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteCommand = async (req, res) => {
  try {
    const { id } = req.params;
    const command = await db.Command.findOne({ where: { command_id: id } });
    if (!command) {
      return res.status(404).json({ message: "Command not found" });
    }
    const commandProduct = await db.Product_Command.findAll({
      where: { command_id: id },
    });
    if (commandProduct) {
      await db.Product_Command.destroy({ where: { command_id: id } });
    }
    await db.Command.destroy({
      where: { command_id: id },
    });
    return res.status(200).json({ message: "Command deleted" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
const getAllCommandProducts = async (req, res) => {
  try {
    let products = [];
    const { id, status } = req.params;
    const commandProducts = await db.Product_Command.findAll({
      where: { command_id: id, status_quantity: status },
    });
    if (!commandProducts || commandProducts.length === 0) {
      return res.status(404).json({ message: "Command or products not found" });
    }

    for (const commandProduct of commandProducts) {
      products.push(commandProduct);
    }
    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
const assignProductToCommand = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      product_id,
      quantity,
      status_quantity,
      unit_price,
      num_inventaire,
    } = req.body;

    console.log(
      product_id,
      quantity,
      status_quantity,
      unit_price,
      num_inventaire
    );
    const createdProductCommand = await db.Product_Command.create({
      command_id: id,
      product_id: product_id,
      unit_price: unit_price,
      quantity: quantity,
      delivered_amount: 0,
      amount_left: quantity,
      num_inventaire: num_inventaire,
      status_quantity: status_quantity,
    });
    return res.status(201).json(createdProductCommand);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "an error has occured" });
  }
};
const updateProductToCommand = async (req, res) => {
  try {
    const { id } = req.params;
    const { product_id, delivered_amount, amount_left, status } = req.body;
    const productCommand = await db.Product_Command.findOne({
      where: { command_id: id, product_id: product_id, status: status },
    });
    if (productCommand) {
      productCommand.delivered_amount = delivered_amount;
      productCommand.amount_left = amount_left;
      await productCommand.save();
      res.status(200).json({ message: "success !" });
    } else {
      return res.status(400).json({ message: "Product not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "an error has occured" });
  }
};

const getServiceCommands = async (req, res) => {
  try {
    const { service_id } = req.params;

    // Fetching user IDs of the service
    const users = await db.User.findAll({
      where: {
        service_id: service_id,
      },
      attributes: ["user_id"],
    });

    // Extracting user IDs from the fetched data
    const userIds = users.map((user) => user.user_id);

    // Fetching internal commands associated with the user IDs and their associated internal orders
    const internalCommands = await db.Command.findAll({
      where: {
        user_id: userIds,
        type: "internal", // Filter by internal type
      },
      include: {
        model: db.InternalOrder,
        where: {
          status: "initialized", // Filter by the status of the associated InternalOrder
        },
      },
    });

    res.json(internalCommands);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const removeProductFromCommand = async (req, res) => {
  try {
    const { id } = req.params;
    const { product_id } = req.body;
    const productCommand = await db.Product_Command.findOne({
      where: { command_id: id, product_id: product_id },
    });
    if (!productCommand) {
      return res.status(404).json({ message: "Product not found in command" });
    }
    await db.Product_Command.destroy({
      where: { command_id: id, product_id: product_id },
    });
    return res.status(200).json({ message: "Product removed from command" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const getPurchasingOrder = async (req, res) => {
  const { id } = req.params;
  await db.PurchasingOrder.findOne({
    where: { command_id: id },
  })
    .then((order) => {
      if (!order) {
        res.status(500).send("no purshasing orders found");
      } else {
        res.status(200).send({ order });
      }
    })
    .catch((error) => {
      res.status(500).send("no purshasing orders found");
    });
};
const updateQuantities = async (req, res) => {
  const { id } = req.params;
  const { quantities, status } = req.body;
  console.log(quantities, status);

  // gerer les deux cas separement
  try {
    const result = quantities.map(async (quantity) => {
      const productCommand = await db.Product_Command.findOne({
        where: {
          command_id: id,
          product_id: quantity.product,
          status_quantity: quantity.status,
        },
      });
      const command = await db.Command.findOne({
        where: { command_id: id },
      });
      console.log("//pr:\n\n\n\n", productCommand);

      if (productCommand) {
        if (status == "bn") {
          productCommand.delivered_amount = quantity.quantity;
          await productCommand.save();
        } else if (command.type === "external" || status !== "edit") {
          productCommand.delivered_amount = quantity.quantity;
          productCommand.amount_left =
            productCommand.amount_left - quantity.quantity;
          productCommand.quantity += quantity.quantity;
          await productCommand.save();
          console.log("//pr:\n\n\n\n", productCommand);
        } else {
          productCommand.quantity = quantity.quantity;
          await productCommand.save();
        }
        console.log(productCommand);
      } else {
        return { message: "Product not found" };
      }
    });
    res.status(200).json({ result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};
const createReceiptProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const { product_id, quantity, unit_price, delivered_amount } = req.body;
    console.log(product_id, quantity, unit_price, delivered_amount);
    const command = await db.Command.findOne({ where: { command_id: id } });
    if (!command) {
      return res.status(500).json({ message: "command not found, try again!" });
    }
    const product = await await db.Product.findOne({
      where: { product_id: product_id },
    });
    if (!product) {
      return res
        .status(500)
        .json({ message: "product not found, try again please!" });
    }
    const previousReceipt = await db.Product_Command.findOne({
      where: { product_id: product_id, command_id: id },
      order: [["createdAt", "DESC"]],
    });
    if (previousReceipt) {
      if (delivered_amount > previousReceipt.amount_left) {
        return res.status(500).json({
          success:
            "failed to create new receipt, invalid delivered amount, check again please!",
        });
      }
      const newReceiptValues = await db.Product_Command.create({
        product_id: product_id,
        command_id: id,
        quantity: quantity,
        delivered_amount: previousReceipt.delivered_amount + delivered_amount,
        amount_left: previousReceipt.amount_left - delivered_amount,
        unit_price: unit_price,
        status_quantity: "validated",
      });
      return res.status(201).json({ newReceiptValues });
    }
    console.log("didnt enter condition");
    const newReceiptValues = await db.Product_Command.create({
      product_id: product_id,
      command_id: id,
      delivered_amount: delivered_amount,
      quantity: quantity,
      amount_left: quantity - delivered_amount,
      unit_price: unit_price,
      status_quantity: "validated",
    });
    return res.status(201).json(newReceiptValues);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const getInteranlOrder = async (req, res) => {
  const { id } = req.params;
  await db.InternalOrder.findOne({
    where: { command_id: id },
  })
    .then((order) => {
      if (!order) {
        res.status(500).send("no internal orders found");
      } else {
        res.status(200).send(order);
      }
    })
    .catch((error) => {
      res.status(500).send("no internal orders found");
    });
};
const getReceiptNoteByIndex = async (req, res) => {
  try {
    const { id, index } = req.params;
    // Validate index
    if (!id || isNaN(id) || !index || isNaN(index) || index <= 0) {
      return res
        .status(400)
        .json({ error: "Invalid command ID or index value" });
    }
    const products = await db.Product_Command.findAll({
      where: { command_id: id },
    });
    console.log(products);
    if (!products || products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found in the receipt note!" });
    }
    let productsSet = new Set();
    products.forEach((product) => productsSet.add(product.product_id));
    let productsList = [];
    for (let product of productsSet) {
      const info = await db.Product_Command.findAll({
        where: {
          command_id: id,
          product_id: product,
          status_quantity: "validated",
        },
        order: [["createdAt", "ASC"]],
        limit: parseInt(index, 10),
      });
      productsList.push(info[index - 1]);
    }
    return res.status(201).json(productsList);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getCommands,
  getPurchasingOrder,
  getCommandById,
  createCommand,
  deleteCommand,
  assignProductToCommand,
  removeProductFromCommand,
  getAllCommandProducts,
  updateProductToCommand,
  getInteranlOrder,
  updateQuantities,
  getServiceCommands,
  createReceiptProducts,
  getExternalCommands,
  getReceiptNoteByIndex,
};
