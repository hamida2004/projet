const router = require('express').Router()
const { getUsers, getUserById, deleteUser, updateUserProfile, getUserRoles, addRoleToUser, deleteRoleFromUser, updateUserRoles, getUserCommands } = require('../Controllers/UserController')
const { verifyAccess,checkAuthorization } = require("../Middlewares/verifyAccess");

router
.get('/',verifyAccess([1]),checkAuthorization, getUsers)
.get('/:id',getUserById)
.delete('/:id',verifyAccess([1]),checkAuthorization, deleteUser)
.put('/:id/editprofile', updateUserProfile)
.get('/:id/roles', getUserRoles)
.get('/:id/commands', getUserCommands)
.post('/:id/roles',verifyAccess([1]),checkAuthorization, addRoleToUser)
.put('/:id/roles',verifyAccess([1]),checkAuthorization,updateUserRoles)
.delete('/:id/roles/:role_id',verifyAccess([1]),checkAuthorization, deleteRoleFromUser)

module.exports= router