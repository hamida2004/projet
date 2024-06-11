const { where } = require("sequelize");
const db = require("../models");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const refresh = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.token) {
    return res.sendStatus(401);
  }
  try {
    const foundUser = await db.User.findOne({
      where: { token: cookies.token },
    });
    if (!foundUser) {
      return res.json({ err: "user  not found" });
    }

    let isHeadOfService = false;
    let serviceId ;
      const result = await db.ServiceHead.findOne({
        where: {
          user_id : foundUser.user_id
        }
      })
      if(result){
        isHeadOfService= true;
        serviceId = result.service_id
      }
    const roles = await db.User_Role.findAll({
      where: {
        user_id: foundUser.user_id,
      },
    });
    jwt.verify(
      cookies.token,
      process.env.REFRESH_TOKEN_KEY,
      async (err, decoded) => {
        if (err || decoded.user !== foundUser.email) {
          console.error(err);
          return res.status(403).json({ error: err.message });
        }
        const accessToken = jwt.sign(
          { user: foundUser.email },
          process.env.ACCESS_TOKEN_KEY,
          {
            expiresIn: "2d",
          }
        );

        let perms = [];
        try {
          if (roles) {
            for (const role of roles) {
              const permissions = await db.Role_Permission.findAll({
                where: {
                  role_id: role.role_id,
                },
              });
              permissions.forEach((permission) => {
                perms.push(permission.permission_id);
              });
            }
            perms = [...new Set(perms)];
          } else {
            console.log("no roles found");
          }
        } catch (error) {
          console.log("no permissions found");
        }

        res.json({
          id: foundUser.user_id,
          accessToken,
          perms,
          isHeadOfService,
          serviceId,
          user: foundUser,
        });
      }
    );
  } catch (error) {
    console.error("Error occurred during refresh:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { refresh };
