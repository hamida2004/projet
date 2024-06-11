// const User = require('../models/User');
const db = require('../models')
const bcrypt = require('bcrypt');

const updatePassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;
        const user = await db.User.findOne({ where: { email: email }});
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const hashedPass= await bcrypt.hash(newPassword, 10);
        console.log(hashedPass)
        const updatedUser = await db.User.update({ password: hashedPass }, {
            where: { email: email }
        });
        return res.status(200).json(updatedUser);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports= { updatePassword }
