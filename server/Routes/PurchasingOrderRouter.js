const router = require('express').Router()
const {getAllPurchasingOrders,getreceipts,getPurchasingOrderById,createPurchasingOrder,deletePurchasingOrder,updatePurchasingOrderStatus, getreceiptById, getCommand} = require('../Controllers/PurchasingOrderController')
const { verifyAccess,checkAuthorization } = require("../Middlewares/verifyAccess");

router
.get('/',verifyAccess([9,10]),checkAuthorization,getAllPurchasingOrders)
.get('/:id',verifyAccess([9,10]),checkAuthorization,getPurchasingOrderById)
.get('/:id/receipts',verifyAccess([9,10]),checkAuthorization,getreceipts)
.get('/:id/receipts/:rid',verifyAccess([9,10]),checkAuthorization,getreceiptById)
.get('/:id/command',verifyAccess([9,10]),checkAuthorization,getCommand)
.post('/',verifyAccess([9]),checkAuthorization,createPurchasingOrder)
.delete('/:id',verifyAccess([9]),checkAuthorization,deletePurchasingOrder)
.put('/:id',verifyAccess([9]),checkAuthorization,updatePurchasingOrderStatus)

module.exports=router