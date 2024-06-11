const router = require('express').Router()
const { verifyAccess,checkAuthorization } = require("../Middlewares/verifyAccess");
const { createRole, getAllRoles, getRoleById, deleteRole, updateRoleName, assignPermissionToRole, removePermissionFromRole, getRolePermissions} = require('../Controllers/RoleController')

router
.get('/', getAllRoles)
.post('/',verifyAccess([2]),checkAuthorization, createRole)
.get('/:id', getRoleById)
.put('/:id',verifyAccess([2]),checkAuthorization, updateRoleName)
.delete('/:id',verifyAccess([2]),checkAuthorization, deleteRole)
.get('/:id/permissions/',verifyAccess([2]),checkAuthorization, getRolePermissions)
.put('/:id/permissions/',verifyAccess([2]),checkAuthorization, assignPermissionToRole)
.delete('/:id/permissions/',verifyAccess([2]),checkAuthorization, removePermissionFromRole);


module.exports= router