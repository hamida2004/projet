const { Op } = require("sequelize");
const db = require("../models");
const createProduct = async (req, res) => {
  try {
    const { name, quantity, limit, description } = req.body;
    const productExists = await db.Product.findOne({ where: { name: name } });
    if (productExists) {
      return res.status(400).json({ error: "Product already exists" });
    }
    const product = await db.Product.create({
      name: name,
      description: description,
      quantity: quantity,
      limit: limit,
    });
    return res.status(201).json(product);
  } catch (error) {
    return res.status(500).json({ error: "Failed to create product" }, error);
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await db.Product.findAll();
    if (!products || products.length === 0) {
      return res.status(404).json({ error: "No products found" });
    }
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ error: "Failed to retrieve products" });
  }
};
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await db.Product.findOne({ where: { product_id: id } });
    if (product) {
      return res.status(200).json(product);
    } else {
      return res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Failed to retrieve product" });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await db.Product.findOne({ where: { product_id: id } });
    if (product) {
      await product.destroy();
      return res.status(200).json({ message: "Product deleted successfully" });
    } else {
      return res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete product" });
  }
};
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const product = await db.Product.findOne({ where: { product_id: id } });
    if (product) {
      product.name = name;
      product.quantity = quantity;
      await product.save();
      return res.status(200).json(product);
    } else {
      return res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Failed to update product" });
  }
};
const assignProductToBranch = async (req, res) => {
  try {
    const { id } = req.params;
    const { branch_id } = req.body;
    try {
      const product = await db.Product.findByPk(id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      if (product.branch_id == branch_id) {
        return res
          .status(400)
          .json({ error: "Product already assigned to this branch" });
      }
      product.branch_id = branch_id;
      await product.save();
      return res
        .status(200)
        .json({ message: "Product assigned to branch successfully" });
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .json({ message: "failed to assign product to branch" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Failed to assign product to branch" });
  }
};

const removeProductFromBranch = async (req, res) => {
  try {
    const { id } = req.params;
    try {
      const product = await db.Product.findOne({ where: { product_id: id } });
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      await product.update({ branch_id: null });
      return res
        .status(200)
        .json({ message: "Product removed from branch successfully" });
    } catch (error) {
      return res.json({ err: error });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Failed to remove product from branch" });
  }
};
const updateProductQuantityInCommand = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity, command_id } = req.body;
    const purchaseOrder = await db.PurchasingOrder.findOne({
      where: { order_id: command_id },
    });
    if (!purchaseOrder) {
      return res.status(404).json({ message: "Command not found" });
    }
    if (purchaseOrder.status !== "pending") {
      return res.status(400).json({
        message:
          "Cannot update product quantity in a command that is not pending",
      });
    }
    const product = await db.Product_Quantity.findOne({
      where: { product_id: id, command_id: command_id },
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found in command" });
    }
    product.quantity = quantity;
    await product.save();
    return res
      .status(200)
      .json({ message: "Product quantity updated successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Failed to update product quantity in command" });
  }
};
const deleteProductFromPurchaseOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { command_id } = req.body;
    const purchaseOrder = await db.PurchasingOrder.findOne({
      where: { order_id: command_id },
    });
    if (!purchaseOrder) {
      return res.status(404).json({ message: "Command not found" });
    }
    if (purchaseOrder.status !== "pending") {
      return res.status(400).json({
        message: "Cannot delete product from a command that is not pending",
      });
    }
    const product = await db.Product_Quantity.findOne({
      where: { product_id: id, command_id: command_id },
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found in command" });
    }
    await db.Product_Quantity.destroy({
      where: { product_id: id, command_id: command_id },
    });
    return res.status(200).json({ message: "Product removed from command" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getProductOccurence = async (id) => {
  try {
    const products = await db.Product_Command.findAll({
      where: {
        product_id: id,
      },
    });
    return products.length;
  } catch (error) {
    return 0;
  }
};
// console.log(getProductOccurence(17))
const MostUsed = async (req, res) => {
  try {
    const AllProducts = await db.Product.findAll();
    const occurencesPromises = AllProducts.map(async (product) => {
      const occurence = await getProductOccurence(product.product_id);
      return { id: product.product_id, occurences: occurence };
    });
    const occurences = await Promise.all(occurencesPromises);
    res.status(200).json(occurences);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while processing your request." });
  }
};
async function getProductUsageYear(id, user_id) {
  try {
    const product = await db.Product.findOne({ where: { product_id: id } });
    if (!product) {
      return { error: "Product not found" };
    }
    const yearAgo = new Date();
    yearAgo.setMonth(yearAgo.getMonth() - 12);
    console.log(yearAgo);
    const whereConditions = {
      type: "internal",
      createdAt: {
        [Op.gte]: yearAgo,
      },
    };

    if (user_id != 0) {
      whereConditions.user_id = user_id;
    }

    const userCommands = await db.Command.findAll({
      where: whereConditions,
    });
    console.log("cmd:\n",userCommands)
    let usageTotal = 0;
    let usageArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let command of userCommands) {
      console.log(command.command_id);
      const products = await db.Product_Command.findAll({
        where: {
          product_id: id,
          command_id: command.command_id,
          status_quantity:"initialized",
          createdAt: {
            [Op.gte]: yearAgo,
          },
        },
        order: [["createdAt", "DESC"]],
        limit: 1,
      });
      if (products) {
        for (let product of products) {
          switch (new Date(product.createdAt).getMonth()) {
            case 0:
              usageArray[0] += product.delivered_amount;
              break;
            case 1:
              usageArray[1] += product.delivered_amount;
              break;
            case 2:
              usageArray[2] += product.delivered_amount;
              break;
            case 3:
              usageArray[3] += product.delivered_amount;
              break;
            case 4:
              usageArray[4] += product.delivered_amount;
              break;
            case 5:
              usageArray[5] += product.delivered_amount;
              break;
            case 6:
              usageArray[6] += product.delivered_amount;
              break;
            case 7:
              usageArray[7] += product.delivered_amount;
              break;
            case 8:
              usageArray[8] += product.delivered_amount;
              break;
            case 9:
              usageArray[9] += product.delivered_amount;
              break;
            case 10:
              usageArray[10] += product.delivered_amount;
              break;
            case 11:
              usageArray[11] += product.delivered_amount;
              break;
          }
          usageTotal += product.delivered_amount;
        }
      }
    }
    return { productid: id, usage: usageArray, total: usageTotal };
  } catch (error) {
    return { error: error.message };
  }
}

async function getServiceUsage(id) {
  //id :service id
  try {
    const service = await db.Service.findOne({ where: { service_id: id } });
    if (!service) {
      return { error: "Service not found" };
    }
    const yearAgo = new Date();
    yearAgo.setMonth(yearAgo.getMonth() - 12);
    console.log(yearAgo);
    const users = await db.User.findAll({
      where: {
        service_id: id,
      },
    });
    const userIds = users.map((user) => user.user_id);

    // Construct where conditions
    const whereConditions = {
      user_id: {
        [Op.in]: userIds,
      },
      type: "internal",
      createdAt: {
        [Op.gte]: yearAgo,
      },
    };
    const userCommands = await db.Command.findAll({
      where: whereConditions,
    });
    let usageTotal = 0;
    let usageArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let command of userCommands) {
      const products = await db.Product_Command.findAll({
        where: {
          command_id: command.command_id,
          createdAt: {
            [Op.gte]: yearAgo,
          },
        },
      });
      if (products) {
        for (let product of products) {
          switch (new Date(product.createdAt).getMonth()) {
            case 0:
              usageArray[0] += product.delivered_amount;
              break;
            case 1:
              usageArray[1] += product.delivered_amount;
              break;
            case 2:
              usageArray[2] += product.delivered_amount;
              break;
            case 3:
              usageArray[3] += product.delivered_amount;
              break;
            case 4:
              usageArray[4] += product.delivered_amount;
              break;
            case 5:
              usageArray[5] += product.delivered_amount;
              break;
            case 6:
              usageArray[6] += product.delivered_amount;
              break;
            case 7:
              usageArray[7] += product.delivered_amount;
              break;
            case 8:
              usageArray[8] += product.delivered_amount;
              break;
            case 9:
              usageArray[9] += product.delivered_amount;
              break;
            case 10:
              usageArray[10] += product.delivered_amount;
              break;
            case 11:
              usageArray[11] += product.delivered_amount;
              break;
          }
          usageTotal += product.delivered_amount;
        }
      }
    }
    return { usage: usageArray, total: usageTotal };
  } catch (error) {
    return { error: error.message };
  }
}

const getConsumedProducts = async (req, res) => {
  const yearAgo = new Date();
  yearAgo.setMonth(yearAgo.getMonth() - 12);
  const { user_id } = req.params;
  try {
    const commands = await db.Command.findAll({
      where: {
        type: "internal",
        createdAt: {
          [Op.gte]: yearAgo,
        },
        user_id: user_id,
      },
    });
    console.log(commands)
    let products = [];
    for (let command of commands) {
      const product = await db.Product_Command.findAll({
        where: {
          command_id: command.command_id,
          status_quantity:"initialized",
          delivered_amount: {
            [Op.gt]: 0
          }
        },
      });
      console.log("//pr\n",product)

      products.push(...product);
    }
    console.log("//pr\n",products)
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getUsageUser = async (req, res) => {
  const { user_id } = req.params;
  try {
    const yearAgo = new Date();
    yearAgo.setMonth(yearAgo.getMonth() - 12);
    const whereConditions = {
      user_id: user_id,
      type: "internal",
      createdAt: {
        [Op.gte]: yearAgo,
      },
    };
    const userCommands = await db.Command.findAll({
      where: whereConditions,
    });
    let usageTotal = 0;
    console.log("userCommands :>> ", userCommands);
    let usageArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let command of userCommands) {
      const products = await db.Product_Command.findAll({
        where: {
          command_id: command.command_id,
          createdAt: {
            [Op.gte]: yearAgo,
          },
        },
      });
      if (products) {
        for (let product of products) {
          switch (new Date(product.createdAt).getMonth()) {
            case 0:
              usageArray[0] += product.delivered_amount;
              break;
            case 1:
              usageArray[1] += product.delivered_amount;
              break;
            case 2:
              usageArray[2] += product.delivered_amount;
              break;
            case 3:
              usageArray[3] += product.delivered_amount;
              break;
            case 4:
              usageArray[4] += product.delivered_amount;
              break;
            case 5:
              usageArray[5] += product.delivered_amount;
              break;
            case 6:
              usageArray[6] += product.delivered_amount;
              break;
            case 7:
              usageArray[7] += product.delivered_amount;
              break;
            case 8:
              usageArray[8] += product.delivered_amount;
              break;
            case 9:
              usageArray[9] += product.delivered_amount;
              break;
            case 10:
              usageArray[10] += product.delivered_amount;
              break;
            case 11:
              usageArray[11] += product.delivered_amount;
              break;
          }
          usageTotal += product.delivered_amount;
        }
      }
    }
    res.status(200).json({ usage: usageArray, total: usageTotal });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserConsommation = async (req, res) => {
  //get a certain user's product consommation
  try {
    const { id, user_id } = req.params;
    const userConsommation = await getProductUsageYear(id, user_id);
    console.log(userConsommation);
    return res.status(200).json({
      user_id: user_id,
      consommation: userConsommation.usage,
      total: userConsommation.total,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const getServiceConsommation = async (req, res) => {
  //get a certain service's product consommation
  try {
    const { id, service_id } = req.params;
    const service = await db.Service.findOne({
      where: { service_id: service_id },
    });
    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }
    const users = await db.User.findAll({ where: { service_id: service_id } });
    let consommationMap = new Map();
    const total = await getServiceUsage(service_id);
    for (let user of users) {
      const userConsommation = await getProductUsageYear(id, user.user_id);
      consommationMap.set(user.user_id, userConsommation.usage);
    }
    console.log(`consommationMap :>> , consommationMap`);
    let totalConsommation = new Map();
    for (let month = 1; month <= 12; month++) {
      for (let [userId, consommation] of consommationMap.entries()) {
        console.log(
          `consommation for user ${userId} in month ${month} :>> , consommation[month-1]`
        );
        totalConsommation.set(
          month - 1,
          (totalConsommation.get(month - 1) || 0) + consommation[month - 1]
        );
      }
    }
    console.log(`totalConsommation :>> `, totalConsommation);
    const serviceConsommation = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < 12; i++) {
      serviceConsommation[i] = totalConsommation.get(i);
    }
    return res.status(200).json({
      service_id: service_id,
      total,
      consommation: serviceConsommation,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const rankArticleProductUsage = async (req, res) => {
  //most consumed product f service
  try {
    const { id, user_id } = req.params;
    console.log("\n/////", id, user_id, "\n/////");
    const product = await db.Product.findOne({
      where: {
        product_id: id,
      },
    });
    if (!product) {
      return res.status(404).json({ error: "No Product found " });
    }

    const usage = await getProductUsageYear(id, user_id);
    return res.status(200).json(usage);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  removeProductFromBranch,
  assignProductToBranch,
  updateProductQuantityInCommand,
  deleteProductFromPurchaseOrder,
  MostUsed,
  //
  getUserConsommation,
  getServiceConsommation,
  rankArticleProductUsage,
  getUsageUser,
  getConsumedProducts
};
