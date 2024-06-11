const db = require("../models");

const getUsers = async (req, res) => {
  try {
    const users = await db.User.findAll();
    return res.json(users);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch users" });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await db.User.findByPk(id);
    if (user) {
      return res.json(user);
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch user" });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      firstName,
      lastName,
      email,
      address,
      phone_num,
      status,
      service_id,
    } = req.body;
    const user = await db.User.findByPk(id);
    if (user) {
      await user
        .update({
          firstname: firstName,
          lastname: lastName,
          email: email,
          address: address,
          phone_num: phone_num,
          status: status,
          service_id: service_id,
        })
        .then(() => {
          res.json(user);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Failed to update user" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await db.User.findByPk(id);
    if (user) {
      await user.destroy();
      return res.json({ message: "User deleted successfully" });
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete user" });
  }
};
const getUserRoles = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await db.User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const userRoles = await db.User_Role.findAll({
      where: { user_id: user.user_id },
    });
    const roles = userRoles.map((element) => element.role_id);
    return res.send(roles);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch user roles" });
  }
};

const getUserCommands = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await db.User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const userCommands = await db.Command.findAll({
      where: { user_id: id ,type:'internal' },
    });
       return res.send(userCommands);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch user roles" });
  }
};
const updateUserRoles = async (req, res) => {
  const { id } = req.params;
  const { roles } = req.body;
  
  try {
    // Delete existing user roles
    await db.User_Role.destroy({ where: { user_id: id } });

    // Create new user roles
    await Promise.all(roles.map(async (roleId) => {
      await db.User_Role.create({ user_id: id, role_id: roleId });
    }));

    res.status(200).json({ message: "User roles updated successfully" });
  } catch (error) {
    console.error("Error updating user roles:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const addRoleToUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { role_id } = req.body;
    console.log(id, role_id);
    const user = await db.User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // await user.addRole(role_id);
    await db.User_Role.create({ user_id: id, role_id: role_id });
    return res.status(201).json({ message: "Role added to user successfully" });
  } catch (error) {
    return;
    // return res.status(500).json({ error: "Failed to add role to user" });
  }
};
const deleteRoleFromUser = async (req, res) => {
  try {
    const { id, role_id } = req.params;
    console.log(id, role_id);
    const user = await db.User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    await db.User_Role.destroy({ where: { user_id: id, role_id: role_id } });
    return res
      .status(200)
      .json({ message: "Role removed from user successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to remove role from user" });
  }
};
module.exports = {
  updateUserProfile,
  getUsers,
  getUserById,
  getUserRoles,
  deleteUser,
  addRoleToUser,
  updateUserRoles,
  deleteRoleFromUser,
  getUserCommands
};
