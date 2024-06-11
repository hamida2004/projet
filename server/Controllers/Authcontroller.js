const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models");
// Assuming all models are defined in models.js
require("dotenv").config();

const createUser = async (req, res) => {
  const {
    username,
    firstname,
    lastname,
    email,
    address,
    phone_num,
    status,
    password,
    service_id,
  } = req.body;
  try {
    const existingUser = await db.User.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "This email is already registered" });
    }
    const existingService = await db.Service.findOne({
      where: { service_id: service_id },
    });
    if (!existingService) {
      return res.status(400).json({ error: "The service does not exist" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await db.User.create({
      username,
      firstname,
      lastname,
      email,
      address,
      phone_num,
      status,
      password: hashedPassword,
      service_id: service_id,
    });
    return res.json({ user });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await db.User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const accessToken = jwt.sign(
        { user: user.email },
        process.env.ACCESS_TOKEN_KEY,
        { expiresIn: "10m" }
      );
      const refreshToken = jwt.sign(
        { user: user.email },
        process.env.REFRESH_TOKEN_KEY,
        { expiresIn: "30d" }
      );

      await db.User.update(
        { token: refreshToken },
        { where: { email: user.email } }
      );
      await res.cookie("token", refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        path: "/", // Set cookie to be valid for all paths
        domain: "localhost",
      });
      let roles = [];
      await db.User_Role.findAll({ where: { user_id: user.user_id } }).then(
        (resp) => {
          console.log(resp)
          resp.map((element) => {
            roles.push(element.role_id);
            console.log("ele", element);
          });
        }
      );
      res.json({accessToken, roles: roles });
    } else {
      return res.status(400).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const logout = async (req, res) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.token) {
      return res.status(204).json({ msg: "Logged out successfully" });
    }
    const foundUser = await db.User.findOne({ where: { token: cookies.token } });
    if (!foundUser) {
      res.clearCookie("token", {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.status(204).json({ msg: "Logged out successfully" });
    }
    await db.User.update({ token: "" }, { where: { token: cookies.token } });
    res.clearCookie("token", {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    res.status(200).json({ msg: "Logged out successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { createUser, loginUser, logout };
