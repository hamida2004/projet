const router = require("express").Router();
const {
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
  rankArticleProductUsage,
  getServiceConsommation,
  getUserConsommation,
  getUsageUser,
  getConsumedProducts,
} = require("../Controllers/ProductController");
const {
  verifyAccess,
  checkAuthorization,
} = require("../Middlewares/verifyAccess");



router
  .get("/", getAllProducts) //done
  .get("/mostUsed", MostUsed)
  .post("/", verifyAccess([7]), checkAuthorization, createProduct) //done
  .get("/:id", getProductById) //done
  .put("/:id", verifyAccess([7]), checkAuthorization, updateProduct) // here you can either push all the information at once (quantity product name etc in the update product or u can seperate them to different routes) // done
  .delete("/:id", verifyAccess([7]), checkAuthorization, deleteProduct) //done
  .delete(
    "/:id/branch",
    verifyAccess([7]),
    checkAuthorization,
    removeProductFromBranch
  ) //done
  .post(
    "/:id/branch",
    verifyAccess([7]),
    checkAuthorization,
    assignProductToBranch
  ) //done
  .put("/:id/command", updateProductQuantityInCommand)
  .get('/usage/product/:id/:user_id',rankArticleProductUsage)
  .get('/usage-user/:user_id',getUsageUser)
  .get('/usage/:user_id/user/:id',getUserConsommation)
  .get('/consumed/:user_id',getConsumedProducts)
  .get('/usage/:service_id/service/:id',getServiceConsommation)
  //done
  .delete("/:id/command", deleteProductFromPurchaseOrder); //done

module.exports = router;
