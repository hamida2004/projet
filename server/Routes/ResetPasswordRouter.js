const router = require('express').Router()
const { updatePassword } = require('../Controllers/UpdatePassword')

router
.put('/', updatePassword)

module.exports=router