const { Op, where } = require("sequelize");
const db = require("../models");
async function getProductEntry(id) {
  const product = await db.Product.findOne({ where: { product_id: id } });
  // get branch id
  const branch_ids = await db.BranchProduct.findAll({
    where: {
      product_id: id,
    },
  });
  if (branch_ids.length == 0) {
    return null;
  }
  let totalEntry = 0;
  const commandOccurences = await db.PurchasingOrder.findAll({
    where: { branch_id: branch_ids[0].branch_id },
  });
  const yearAgo = new Date();
  yearAgo.setMonth(yearAgo.getMonth() - 12);
  for (let command of commandOccurences) {
    const productEntry = await db.Product_Command.findOne({
      where: {
        command_id: command.command_id,
        product_id: product.product_id,
        createdAt: {
          [Op.gte]: yearAgo,
        },
      },
      order: [["createdAt", "DESC"]],
      limit: 1,
    });
    if (productEntry) {
      totalEntry += productEntry.delivered_amount;
    }
  }
  return totalEntry;
}
async function getRestProduct(id) {
  const product = await db.Product.findOne({ where: { product_id: id } });
  if (!product) {
    return "product not found";
  }
  const productEntryTotal = await getProductEntry(product.product_id);
  const productExitTotal = await getExitProduct(product.product_id);
  return product.quantity + productExitTotal - productEntryTotal;
}

async function getEntryProduct(id) {
  const product = await db.Product.findOne({ where: { product_id: id } });
  if (!product) {
    return "product not found";
  }
  const entry = await getProductEntry(id);
  return entry;
}

async function getExitProduct(id) {
  const product = await db.Product.findOne({ where: { product_id: id } });
  if (!product) {
    return "product not found";
  }
  let totalExit = 0;
  const Commands = await db.Command.findAll({ where: { type: `internal` } });
  for (let command of Commands) {
    const productExit = await db.Product_Command.findOne({
      where: {
        command_id: command.command_id,
        product_id: id,
        status_quantity: `satisfied`,
      },
    });
    if (productExit) {
      totalExit += productExit.delivered_amount;
    }
  }
  return totalExit;
}

async function getLogicalQuantity(id) {
  const product = await db.Product.findOne({ where: { product_id: id } });
  if (!product) {
    return "product not found";
  }
  return product.quantity;
}

const getInfoFicheProduct = async (req, res) => {
  const { id } = req.params;
  const product = await db.Product.findOne({ where: { product_id: id } });
  if (!product) {
    return res.status(404).send("product not found");
  }
  const entry = await getEntryProduct(id);
  const exit = await getExitProduct(id);
  const logicalQuantity = await getLogicalQuantity(id);
  const rest = await getRestProduct(id);
  if (!entry) {
    return res.status(500).json("no entry for this product!");
  }
  res.status(200).json({
    product_id: product.product_id,
    rest: rest,
    entryTotal: entry,
    exitTotal: exit,
    logicalQuantity: logicalQuantity,
  });
};
const getInfoFicheArticle = async (req, res) => {
  try {
    const { id } = req.params;

    const products = await db.BranchProduct.findAll({
      where: { branch_id: id },
    });

    if (products.length === 0) {
      return res.status(404).json({ message: "No products for this branch!" });
    }

    const resp = await Promise.all(
      products.map(async (product) => {
        const rest = await getRestProduct(product.product_id);
        const entryTotal = await getEntryProduct(product.product_id);
        const exitTotal = await getExitProduct(product.product_id);
        const logicalQuantity = await getLogicalQuantity(product.product_id);

        return {
          product_id: product.product_id,
          rest,
          entryTotal,
          exitTotal,
          logicalQuantity,
        };
      })
    );

    res.status(200).json(resp);
  } catch (error) {
    console.error("Error fetching product info:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const inventoryArticles = async (req, res) => {
  const { branch_id } = req.params;
  const inventory = await db.Inventory.findAll({
    where: {
      branch_id: branch_id,
    },
  });
  if (inventory.length === 0) {
    return res.status(500).json("no inventory for this branch ");
  } else {
    return res.status(200).json(inventory);
  }
};

const addProductToInventory = async (req, res) => {
  const { branch_id } = req.params;
  const { product_id, observation, qt_physique, num_inv } = req.body;
  try {
    await db.Inventory.create({
      product_id,
      observation,
      qt_physique,
      num_inv,
      branch_id
    });
    res.status(201).json("created successfully !");
  } catch (error) {
    res.status(500).json("something went wrong");
  }
};

const updateProductToInventory = async (req, res) => {
  const { branch_id } = req.params;
  const { product_id, observation, qt_physique, num_inv } = req.body;
  try {
    const product = await db.Inventory.findOne({
      where: {
        branch_id: branch_id,
        product_id: product_id,
      },
    });
    if (!product) {
      return res.status(500).json("no product found in inventory");
    }
    product.num_inv = num_inv;
    product.observation = observation;
    product.qt_physique = qt_physique;
    product.save();
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json("something went wrong", error);
  }
};
module.exports = { getInfoFicheProduct, getInfoFicheArticle ,inventoryArticles ,addProductToInventory,updateProductToInventory};
