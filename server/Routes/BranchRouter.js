const router = require('express').Router()
const { getBranches,getBranchById,createBranch,updateBranch,deleteBranch,assignBranchToChapter,removeBranchFromChapter,getBranchProducts, assignProductsToBranch } = require('../Controllers/BranchController')
const { verifyAccess,checkAuthorization } = require("../Middlewares/verifyAccess");


router
.get('/', getBranches)
.get('/:id', getBranchById)
.post('/',verifyAccess([6]),checkAuthorization, createBranch)
.put('/:id',verifyAccess([6]),checkAuthorization, updateBranch)
.delete('/:id', verifyAccess([6]),checkAuthorization,deleteBranch)
.put('/:id/chapter/', verifyAccess([6]),checkAuthorization,assignBranchToChapter)
.delete('/:id/chapter/',verifyAccess([6]),checkAuthorization, removeBranchFromChapter)
.get('/:id/products', getBranchProducts)
.post('/:id/products', assignProductsToBranch)

module.exports= router