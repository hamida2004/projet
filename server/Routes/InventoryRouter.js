const express = require("express");
const {
  inventoryArticles,
  addProductToInventory,
  updateProductToInventory,
  getInfoFicheArticle,
} = require("../Controllers/inventory");
const router = express.Router();
const { verifyAccess, checkAuthorization } = require("../Middlewares/verifyAccess");

router
  .get(
    "/:id",
    verifyAccess([13, 15, 16, 19]),
    checkAuthorization,
    getInfoFicheArticle
  )
  .post("/:branch_id", addProductToInventory)
  .put("/:branch_id", updateProductToInventory)
  .get(
    "/branch/:branch_id",
    verifyAccess([13, 15, 16, 19]),
    checkAuthorization,
    inventoryArticles
  );

module.exports = router;
