
const db= require('../models/');


const getAllPermissions = async (req, res) => {
    try {
        const permissions = await db.Permission.findAll();
        return res.json(permissions);
    }catch(error){
        return res.status(500).json({ error: 'An Error Has Occured' });
    }
}


const getPermissionById = async (req, res) => {
    try {
        const { id } = req.params;
        const permission = await db.Permission.findByPk(id);
        if (!permission) {
            return res.status(404).json({ error: 'Permission not found' });
        }
        return res.status(200).json(permission);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to retrieve permission' });
    }
}

const updatePermissionName = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const permission = await db.Permission.findByPk(id);
        if (!permission) {
            return res.status(404).json({ error: 'Permission not found' });
        }
        permission.name=name;
        await permission.save();
        return res.status(200).json(permission);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to update permission' });
    }
}


module.exports = {
    getAllPermissions,
    getPermissionById,
    updatePermissionName,
}
