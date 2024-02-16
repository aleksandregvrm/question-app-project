const express = require("express");
const { changeUserRole,getAllUsers } = require("../controllers/adminController");
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");
const router = express.Router();

router
  .route("/changeRole")
  .patch(authenticateUser, authorizePermissions("admin"), changeUserRole);
router.route("/allUsers").get(authenticateUser,authorizePermissions("admin"),getAllUsers)
module.exports = router;
