const express = require("express");
const router = express.Router();
const internalOrderController = require("../Controllers/InternalOrderController");
const { verifyAccess,checkAuthorization } = require("../Middlewares/verifyAccess");


router
  .post("/",verifyAccess([20]),checkAuthorization, internalOrderController.createInternalOrder)
  .get("/",verifyAccess([14,20]),checkAuthorization, internalOrderController.getAllInternalOrders)
  .get("/:id",verifyAccess([14]),checkAuthorization, internalOrderController.getInternalOrderById)
  .put("/:id",verifyAccess([20]),checkAuthorization, internalOrderController.updateInternalOrder)
  .get("/status/:status",verifyAccess([14,20]),checkAuthorization, internalOrderController.getOrdersByStatus)
  .put("/:id/status",verifyAccess([20,17]),checkAuthorization, internalOrderController.updateOrderStatus)
  .delete("/:id",verifyAccess([20]),checkAuthorization, internalOrderController.deleteInternalOrder);

module.exports = router;
