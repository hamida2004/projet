const db = require('../models')


const getAllServices = async (req, res) => {
    try {
        const services = await db.Service.findAll({});
        return res.json(services);
    } catch (error) {
        return res.status(500).json({ error: 'An Error Has Occured' });
    }
}
const getServiceById = async (req, res) => {
    try {

        const { id } = req.params;
        const service = await db.Service.findByPk(id);

        if (service) {
            return res.json(service);
        }
        return res.status(404).json({ error: 'Service not found' });
    } catch (error) {
        return res.status(500).json({ error: 'An Error Has Occured' });
    }
}

const createService = async (req, res) => {
    try {

        const {name} = req.body;
        const service = await db.Service.create({name:name});

        return res.status(201).json(service);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to create service' });
    }
}
const deleteService = async (req, res) => {
    try {
        const { id } = req.params;
        const service = await db.Service.findByPk(id);
        if (service) {
            const users = await db.User.findAll({where: {service_id: id}});
            if(users){
                for (const user of users) {
                    await user.update({ service_id: null });
                    console.log(user.service_id)
                }               
            }
            await service.destroy();
            return res.json({ message: 'Service deleted successfully' });
        } else {
            return res.status(404).json({ error: 'Service not found' });
        }
    } catch (error) {
        console.log(error); // incase something with the users went wrong we can see that the problem is coming from there
        return res.status(500).json({ error: 'An Error Has Occured' });
    }
}
const updateServiceName = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const service = await db.Service.findByPk(id);

        if (service) {
            service.name = name;
            await service.save();
            return res.status(200).json(service);
        } else {
            return res.status(404).json({ error: 'Service not found' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Failed to update service' });
    }
};

const assignUserToService = async (req, res) => {
    try {
        const { id } = req.params;
        const { user_id } = req.body;
        const user = await db.User.findByPk(user_id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        user.service_id = id;
        await user.save();
        return res.status(200).json({ message: 'User assigned to service successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to assign user to service' });
    }
}
const removeUserFromService = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await db.User.findOne({where: {user_id: id}});
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        user.service_id = null;
        await user.save();
        return res.status(200).json({ message: 'User removed from service successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to remove user from service' });
    }
}
const getAllServiceUsers = async (req, res) => {
    try {
        const { id } = req.params;
        const service = await db.Service.findByPk(id);
        if (!service || !service.length===0) {
            return res.status(404).json({ error: 'Service not found' });
        }
        const users = await db.User.findAll({where: {service_id: id}});
        return res.json(users);
    } catch (error) {
        return res.status(500).json({ error: 'An Error Has Occured' });
    }
}

module.exports={
    createService,
    deleteService,
    updateServiceName,
    assignUserToService,
    removeUserFromService,
    getAllServices,
    getServiceById,
    getAllServiceUsers
}