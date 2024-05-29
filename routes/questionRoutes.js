const express = require("express");
const {
  getAllQuestions,
  getSingleQuestion,
  uploadQuestion,
  editQuestion,
} = require("../controllers/questionController");
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");
const router = express.Router();

router
  .route("/")
  .post(
    // authenticateUser,
    // authorizePermissions("admin", "question-guru"),
    uploadQuestion
  )
  .get(
    // authenticateUser,
    // authorizePermissions("admin", "user", "question-guru"),
    getAllQuestions
  );
router
  .route("/:id")
  .get(
    authenticateUser,
    authorizePermissions("admin", "question-guru"),
    getSingleQuestion
  )
  .patch(
    // authenticateUser,
    // authorizePermissions("admin", "question-guru"),
    editQuestion
  );

module.exports = router;
