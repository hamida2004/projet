const router = require("express").Router();
const { verifyAccess,checkAuthorization } = require("../Middlewares/verifyAccess");

const {
  loginUser,
  createUser,
  logout,
} = require("../Controllers/AuthController");
router
  .post("/register",verifyAccess([1]),checkAuthorization, createUser)
  .post("/login", loginUser)
  .get("/logout", logout);
module.exports = router;
