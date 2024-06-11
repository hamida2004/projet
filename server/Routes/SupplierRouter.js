const router = require('express').Router()
const { getAllSuppliers, createSupplier, getSupplierById,deleteSupplier,updateSupplier} = require('../Controllers/SupplierController')
const { verifyAccess,checkAuthorization } = require("../Middlewares/verifyAccess");


router
.get('/', getAllSuppliers)
.post('/',verifyAccess([8]),checkAuthorization, createSupplier)
.get('/:id', getSupplierById)
.put('/:id',verifyAccess([8]),checkAuthorization, updateSupplier)
.delete('/:id',verifyAccess([8]),checkAuthorization, deleteSupplier)

module.exports=router
