const router = require('express').Router()
const { getChapters,getChapterById,createChapter,updateChapter,deleteChapter, getChapterBranches } = require('../Controllers/ChapterController')
const { verifyAccess,checkAuthorization } = require("../Middlewares/verifyAccess");


router
.get('/', getChapters)//done
.post('/',verifyAccess([5]),checkAuthorization, createChapter) //done
.get('/:chapter_id', getChapterById)//done
.put('/:chapter_id',verifyAccess([5]),checkAuthorization, updateChapter) //done
.delete('/:chapter_id',verifyAccess([5]),checkAuthorization, deleteChapter) //done
.get('/:id/branches',getChapterBranches) //done
module.exports= router
