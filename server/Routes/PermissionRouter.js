const router = require('express').Router()
const { getAllPermissions, getPermissionById, updatePermissionName} = require('../Controllers/PermissionController')
const { verifyAccess,checkAuthorization } = require("../Middlewares/verifyAccess");
router
.get('/', getAllPermissions)
.get('/:id', getPermissionById)
.put('/:id', verifyAccess([3]),checkAuthorization,updatePermissionName)

module.exports= router