const { where } = require("sequelize");
const db = require("../models");
const getBranches = async (req, res) => {
  try {
    const branches = await db.Branch.findAll();
    if (!branches || branches.length === 0) {
      return res.status(404).json({ error: "No branches found" });
    }
    return res.status(200).json(branches);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const getBranchById = async (req, res) => {
  try {
    const { id } = req.params;
    const branch = await db.Branch.findOne({
      where: { branch_id: id },
    });
    if (!branch || branch.length === 0) {
      res.status(404).json({ error: "Branch not found" });
    }
    return res.status(200).json(branch);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const createBranch = async (req, res) => {
  try {
    const { name, VAT, chapter_id } = req.body;
    const branch = await db.Branch.findOne({ where: { name: name } });
    if (branch) {
      return res.status(400).json({ error: "Branch already exists" });
    }
    const newBranch = await db.Branch.create({
      name: name,
      VAT: VAT,
      chapter_id: chapter_id,
    });
    return res
      .status(201)
      .json({ message: "Branch created successfully", branch: newBranch });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateBranch = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, VAT } = req.body;
    const branch = await db.Branch.findOne({ where: { branch_id: id } });
    if (!branch || branch.length === 0) {
      res.status(404).json({ error: "Branch not found" });
    }
    branch.name = name;
    branch.VAT = VAT;
    await branch.save();
    return res.status(200).json(branch);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteBranch = async (req, res) => {
  try {
    const { id } = req.params;
    const branch = await db.Branch.findOne({ where: { branch_id: id } });
    if (!branch) {
      return res.status(404).json({ error: "Branch not found" });
    }
    await db.Branch.destroy({
      where: { branch_id: id },
    });
    return res.status(200).json({ message: "Branch deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const assignBranchToChapter = async (req, res) => {
  try {
    const { id } = req.params;
    const { chapter_id } = req.body;
    const branch = await db.Branch.findOne({ where: { branch_id: id } });
    if (!branch || branch.length === 0) {
      return res.status(404).json({ error: "Branch not found" });
    }
    if (branch.chapter_id == chapter_id) {
      return res
        .status(400)
        .json({ error: "Branch already assigned to this chapter" });
    }
    branch.chapter_id = chapter_id;
    await branch.save();
    return res
      .status(200)
      .json({ message: "Branch assigned to chapter successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Failed to assign branch to chapter" });
  }
};
const removeBranchFromChapter = async (req, res) => {
  try {
    const { id } = req.params;
    const { chapter_id } = req.body;
    const branch = await db.Branch.findOne({
      where: { branch_id: id, chapter_id: chapter_id },
    });
    if (!branch || branch.length === 0) {
      return res.status(404).json({ error: "Branch not found" });
    }
    branch.chapter_id = null;
    await branch.save();
    return res
      .status(200)
      .json({ message: "Branch removed from chapter successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Failed to remove branch from chapter" });
  }
};
const getBranchProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const branch = await db.Branch.findOne({ where: { branch_id: id } });

    if (!branch || branch.length === 0) {
      return res.status(404).json({ error: "Branch not found" });
    }
    const products = await db.BranchProduct.findAll({ where: { branch_id: id } });
    const allProducts = await db.Product.findAll({})
    result = allProducts.filter(product => products.some(p => p.product_id === product.product_id)) 
    if (!products || products.length === 0) {
      return res
        .status(404)
        .json({ error: "No products found for this branch" });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: "Failed to get branch products" });
  }
};

const assignProductsToBranch = async (req, res) => {
  try {
    const { id } = req.params;
    const products = req.body;
    products.map(async (product) => {
      db.BranchProduct.create({branch_id : id , product_id : product})
    });
    return res.status(201).json("created successfully");
  } catch (error) {
    return res.status(500).json({ error: "Failed to get branch products" });
  }
};
module.exports = {
  getBranches,
  getBranchById,
  createBranch,
  updateBranch,
  deleteBranch,
  assignBranchToChapter,
  removeBranchFromChapter,
  getBranchProducts,
  assignProductsToBranch,
};
