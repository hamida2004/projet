const db= require('../models/')
const getAllSuppliers = async (req, res) => {
    try {
        const suppliers = await db.Supplier.findAll();
        if(!suppliers || suppliers.length===0){
            return res.status(404).json({ message: `no suppliers found!` });
        }
        return res.status(201).json({ suppliers });
    } catch (error) {
        console.log(error)
        return res.status(400).json({ error: error.message });
    }
}

const getSupplierById = async (req, res) => {
    try {
        const {id}=req.params
        const supplier = await db.Supplier.findOne({ where: { supplier_id: id } });
        if(!supplier){
            return res.status(404).json({ message: `no supplier found with id ${req.params.id}!` });
        }
        return res.status(201).json({ supplier });
    }
    catch (error) {
        console.log(error)
        return res.status(400).json({ error: error.message });
    }
}
const createSupplier = async (req, res) => {
    try {
        const { name,address,email,phone_num,registre_c,NIF,RIB } = req.body;
        const supplierExists= await db.Supplier.findOne({where: {name:name}});
        if(supplierExists){
            return res.status(400).json({error: 'Supplier already exists'});
        }
        const supplier = await db.Supplier.create({name:name,address:address,email:email,phone_num:phone_num,registre_c:registre_c,NIF:NIF,RIB:RIB});
        return res.status(201).json(supplier);
    }
    catch (error) {
        return res.status(500).json({ error: 'Failed to create supplier' });
    }
}
const updateSupplier= async (req, res) => {
    try {
        const { id } = req.params;
        const { name,address,email,phone_num,registre_c,NIF,RIB } = req.body;
        const supplier = await db.Supplier.findOne({where: {supplier_id:id}});
        if (supplier) {
            await supplier.update({name:name,address:address,email:email,phone_num:phone_num,registre_c:registre_c,NIF:NIF,RIB:RIB});
            return res.status(200).json({ message: 'Supplier updated successfully' });
        } else {
            return res.status(404).json({ error: 'Supplier not found' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Failed to update supplier' });
    }
}
const deleteSupplier = async (req, res) => {
    try {
        const { id } = req.params;
        const supplier = await db.Supplier.findOne({where: {supplier_id:id}});
        if (supplier) {
            await supplier.destroy();
            return res.status(200).json({ message: 'Supplier deleted successfully' });
        } else {
            return res.status(404).json({ error: 'Supplier not found' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Failed to delete supplier' });
    }
}
module.exports={getAllSuppliers,getSupplierById,createSupplier,deleteSupplier,updateSupplier}