const User = require("../models/UserModel");
const QuizStats = require("../models/QuizStatsModel");
const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");

// Change User Role
const changeUserRole = async (req, res) => {
  const { editingRole, editingId } = req.body;
  if (!editingRole || !editingId) {
    throw new CustomError.BadRequestError("Please provide new role and name");
  }
  const user = await User.findOne({ _id:editingId });
  if (!user) {
    throw new CustomError.NotFoundError("Could not find a user with that name");
  }
  if (user.role === "admin") {
    return res
      .status(StatusCodes.METHOD_NOT_ALLOWED)
      .json({ msg: "You cannot change a role of an admin" });
  }
  await User.findOneAndUpdate(
    { _id: editingId },
    { role: editingRole },
    {
      runValidators: true,
    }
  );
  await QuizStats.findOneAndUpdate(
    { user: editingId },
    { role: editingRole },
    { runValidators: true }
  );
  res.status(StatusCodes.OK).json({ msg: "User role updated" });
};
// Get All Users
const getAllUsers = async (req, res) => {
  const allUsers = await User.find({});
  res.status(StatusCodes.OK).json({ allUsers });
};
const getAllQuizStats = async (req, res) => {
  const allUserStats = await QuizStats.find({});
  res.status(StatusCodes.OK).json({ allUserStats });
};
const getSingleQuizStat = async (req, res) => {
  const { id } = req.query;
  console.log(id);
  const singleUserStat = await QuizStats.find({ user: id });
  if (!singleUserStat) {
    throw new CustomError.NotFoundError("Could not find the user");
  }
  console.log(singleUserStat);
  res.status(StatusCodes.OK).json({ singleUserStat });
};
module.exports = {
  changeUserRole,
  getAllUsers,
  getAllQuizStats,
  getSingleQuizStat,
};
