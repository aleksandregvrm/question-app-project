const express = require("express");
const {
  evaluateQuizStats,
  getQuizStats,
  getLeaderBoardStats,
} = require("../controllers/quizStatsController");
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");
const router = express.Router();

router
  .route("/")
  .get(
    // authenticateUser,
    // authorizePermissions("admin", "user", "question-guru"),
    getQuizStats
  );
router
  .route("/evaluate")
  .post(
    authenticateUser,
    authorizePermissions("admin", "user", "question-guru"),
    evaluateQuizStats
  );
router.route("/leaderboard").get(getLeaderBoardStats);
// need to add authentication here later

module.exports = router;
