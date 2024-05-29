const express = require("express");
const {
  changeUserRole,
  getAllUsers,
  getAllQuizStats,
  getSingleQuizStat,
} = require("../controllers/adminController");
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");
const router = express.Router();

router
  .route("/changeRole")
  .patch(
    // authenticateUser, authorizePermissions("admin")
   changeUserRole);
router
  .route("/allUsers")
  .get(authenticateUser, authorizePermissions("admin"), getAllUsers);
router.route("/allQuizStats").get(
  // authenticateUser, authorizePermissions("admin")
  getAllQuizStats
);
router.route("/singleQuizStat").get(
  //authenticateUser, authorizePermissions("admin")
  getSingleQuizStat
);
module.exports = router;
