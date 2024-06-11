const jwt = require("jsonwebtoken");
const db = require("../models");
require("dotenv").config();
const verifyAccess = (requiredPermissions) => {
  return async (req, res, next) => {
    const authHeaders = req.headers["authorization"];
    if (!authHeaders) return res.sendStatus(401);
    const accessToken = authHeaders.split(" ")[1];
    if (accessToken) {
      jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_KEY,
        async (err, decoded) => {
          if (err) {
            res.sendStatus(401);
          } else {
            try {
              const user = await db.User.findOne({
                where: {
                  email: decoded.user,
                },
              });
              const userRoles = await db.User_Role.findAll({
                where: {
                  user_id: user.user_id,
                },
              });
              let result = [];
              await Promise.all(
                userRoles.map(async (userRole) => {
                  (
                    await db.Role_Permission.findAll({
                      where: {
                        role_id: userRole.role_id,
                      },
                    })
                  ).map((rolesPermission) => {
                    result.push(rolesPermission.permission_id);
                  });
                })
              );
              const isAuthorized = result.some((permission) =>
                requiredPermissions.includes(permission)
              );
              req.isAuthorized = isAuthorized;
              next();
            } catch (error) {
              console.error("Error verifying JWT:", error);
              res.sendStatus(500);
            }
          }
        }
      );
    } else {
      res.sendStatus(403);
    }
  };
};

const checkAuthorization = (req, res, next) => {
  if (req.isAuthorized) {
    next();
  } else {
    res.status(403).send("Forbidden");
  }
};

module.exports = { verifyAccess, checkAuthorization };
