const db = require('../models')

const getChapters = async (req, res) => {
    try {
        const chapters = await db.Chapter.findAll();
        return res.status(200).json(chapters);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
const getChapterById = async (req, res) => {
    try {
        const {chapter_id} = req.params;
        const chapter = await db.Chapter.findByPk(chapter_id);
        if(!chapter) return res.status(404).json({ error: 'Chapter not found' });
        return res.status(200).json(chapter);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
const createChapter = async (req, res) => {
    try {
        const {name}=req.body; 
        const chapter= await db.Chapter.findOne({where:{name:name}});
        if(chapter) {
            return res.status(400).json({ error: 'Chapter already exists' });
            }       
        const chptr = await db.Chapter.create({name:name});
        return res.status(201).json(chptr);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
const updateChapter = async (req, res) => {
    try {
        const {chapter_id} = req.params;
        const {name} = req.body;
        const chapter = db.Chapter.findByPk(chapter_id);
        if(!chapter) {
            return res.status(404).json({ error: 'Chapter not found' });
        }
        const updatedChapter = await db.Chapter.update({name:name}, {
            where: { chapter_id: chapter_id }
        });
        return res.status(200).json(updatedChapter);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
const deleteChapter = async (req, res) => {
    try {
        const {chapter_id} = req.params;
        const chapter = await db.Chapter.findByPk(chapter_id);
        if (!chapter) {
            return res.status(404).json({ error: 'Chapter not found' });
        }
        const chapterBranches= await db.Branch.findAll({where: {chapter_id:chapter_id}});
        if(chapterBranches){
            chapterBranches.map(async (branch) => {
            await db.Branch.destroy({where: {branch_id: branch.branch_id}});
            })
        }
        await db.Chapter.destroy({
            where: { chapter_id: chapter_id }
        });
        return res.json({ message: `Chapter ${chapter_id} deleted` });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
const getChapterBranches = async (req, res) => {
    try {
        const {id} = req.params;
        const chapter = await db.Chapter.findByPk(id);
        if (!chapter) {
            return res.status(404).json({ error: 'Chapter not found' });
        }
        const branch = await db.Branch.findAll({where: {chapter_id: id}});
        if(!branch) {
            return res.status(404).json({ error: 'Branches not found' });
        }
        return res.status(200).json(branch);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getChapters,
    getChapterById,
    createChapter,
    updateChapter,
    deleteChapter,
    getChapterBranches
}
