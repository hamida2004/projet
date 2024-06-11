const router = require('express').Router();
const{ getCommands,getPurchasingOrder,updateProductToCommand, getCommandById,createCommand,deleteCommand,assignProductToCommand,removeProductFromCommand, getAllCommandProducts, getInteranlOrder, getExternalCommands, updateQuantities, getServiceCommands, createReceiptProducts, getReceiptNoteByIndex} = require('../Controllers/CommandController');
const { verifyAccess,checkAuthorization } = require("../Middlewares/verifyAccess");

router
.get('/', verifyAccess([9,10,12,14,15,16,17,20]),checkAuthorization,getCommands)
.get('/external-commands', verifyAccess([9,10,12]),checkAuthorization,getExternalCommands)
.get('/:id', verifyAccess([9,10,12,14,15,16,17,20]),checkAuthorization,getCommandById)
.post('/' ,verifyAccess([9,12,17,20]),checkAuthorization, createCommand)
.delete('/:id',verifyAccess([9,12,17,20]),checkAuthorization, deleteCommand)
.post('/:id/products',verifyAccess([9,12,15,16,17,20]),checkAuthorization, assignProductToCommand)
.put('/:id/products',verifyAccess([9,12,15,16,17,20]),checkAuthorization, updateProductToCommand)
.delete('/:id/products',verifyAccess([9,12,17,20]),checkAuthorization, removeProductFromCommand)
.get('/service/:service_id',verifyAccess([17]),checkAuthorization, getServiceCommands)
.get('/:id/products/:status',verifyAccess([9,10,12,14,15,16,17,20]),checkAuthorization, getAllCommandProducts)
.get('/:id/purchasing-order',verifyAccess([9,10,12,17,20]),checkAuthorization, getPurchasingOrder)
.put('/:id/updateQuantities',verifyAccess([9,12,15,16,17,20]),checkAuthorization, updateQuantities)
.post('/:id/create-receipt-products',verifyAccess([9,12,15,16,17,20]),checkAuthorization, createReceiptProducts)
.get('/:id/receipt-products/:index',verifyAccess([9,12,15,16,17,20]),checkAuthorization, getReceiptNoteByIndex)
.get('/:id/internal-order',verifyAccess([14,15,16,17,20]),checkAuthorization, getInteranlOrder)

module.exports = router;