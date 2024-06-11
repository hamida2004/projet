const router=require('express').Router()
const {getAllReceiptNotes,getReceiptNoteById,createReceiptNote}=require('../Controllers/ReceiptNoteController')
const { verifyAccess,checkAuthorization } = require("../Middlewares/verifyAccess");


router
.get('/',getAllReceiptNotes)
.get('/:id',getReceiptNoteById)
.post('/:id',verifyAccess([9,12]),checkAuthorization,createReceiptNote)
module.exports=router
