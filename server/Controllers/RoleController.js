const db = require("../models/");
const createRole = async (req, res) => {
  try {
    const { name } = req.body;
    const role = await db.Role.create({ name: name });
    return res.status(201).json(role);
  } catch (error) {
    return res.status(500).json({ error: "Failed to create role" });
  }
};

const getAllRoles = async (req, res) => {
  try {
    const roles = await db.Role.findAll();
    if (!roles || roles.length === 0) {
      return res.status(404).json({ error: "No roles found" });
    }
    return res.status(200).json(roles);
  } catch (error) {
    return res.status(500).json({ error: "Failed to retrieve roles" });
  }
};

const getRoleById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const role = await db.Role.findByPk(parseInt(id));
    if (role) {
      return res.status(200).json(role);
    } else {
      return res.status(404).json({ error: "Role not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to retrieve role" });
  }
};

const updateRoleName = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const role = await db.Role.findByPk(id);
    if (role) {
      role.name = name;
      await role.save();
      return res.status(200).json(role);
    } else {
      return res.status(404).json({ error: "Role not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Failed to update role" });
  }
};

const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await db.Role.findByPk(id);
    const rolePermissions = await db.Role_Permission.findAll({
      where: { role_id: id },
    });
    if (role) {
      if (rolePermissions) {
        await db.Role_Permission.destroy({ where: { role_id: id } });
      }
      console.log("destroyed permissions");
      await role.destroy();
      return res.status(200).json({ message: "Role deleted successfully" });
    } else {
      return res.status(404).json({ error: "Role not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete role" });
  }
};
const assignPermissionToRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { permission_id } = req.body;
    const rolePermissions = await db.Role_Permission.findOne({
      where: { role_id: id, permission_id: permission_id },
    });
    if (rolePermissions) {
      return;
    }
    await db.Role_Permission.create({ role_id: id, permission_id });
    return res
      .status(201)
      .json({ message: "Permission assigned to role successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Failed to assign permission to role" });
  }
};

const removePermissionFromRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { permission_id } = req.body;

    const rolePermissions = await db.Role_Permission.findOne({
      where: { role_id: id, permission_id: permission_id },
    });
    if (!rolePermissions) {
      return res.status(404).json({ error: "Permission or role not found" });
    }
    await rolePermissions.destroy();

    return res
      .status(200)
      .json({ message: "Permission deleted from role successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Failed to delete permission from role" });
  }
};
const getRolePermissions = async (req, res) => {
  try {
    const { id } = req.params;
    const rolePermissions = await db.Role_Permission.findAll({
      where: { role_id: id },
    });
    return res.status(200).json(rolePermissions);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Failed to retrieve role permissions" });
  }
};
module.exports = {
  createRole,
  getAllRoles,
  getRoleById,
  updateRoleName,
  deleteRole,
  assignPermissionToRole,
  removePermissionFromRole,
  getRolePermissions,
};
