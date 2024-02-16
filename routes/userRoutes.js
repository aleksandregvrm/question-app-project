const express = require("express");
const {
  registerUser,
  verifyUser,
  loginUser,
  logoutUser,
  changeUser,
  changePassword,
  resetPassword,
  deleteUser
} = require("../controllers/userController");
const { authenticateUser } = require("../middleware/authentication");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/verify-email").get(verifyUser);
router.route("/login").post(loginUser);
router.route("/logout").delete(authenticateUser, logoutUser);
router.route("/change-user").patch(authenticateUser,changeUser);
// authentication needed here
router.route("/change-password").post(changePassword);
router.route("/reset-password").post(resetPassword);
router.route("/delete-user").delete(authenticateUser,deleteUser);

module.exports = router;
