const User = require("../models/UserModel");
const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");

// Change User Role
const changeUserRole = async (req, res) => {
  const { newRole, name } = req.body;
  if (!newRole || !name) {
    throw new CustomError.BadRequestError("Please provide new role and name");
  }
  const user = await User.findOne({ name });
  if (!user) {
    throw new CustomError.NotFoundError("Could not find a user with that name");
  }
  if (user.role === "admin") {
    return res
      .status(StatusCodes.METHOD_NOT_ALLOWED)
      .json({ msg: "You cannot change a role of an admin" });
  }
  const newUserRole = await User.findOneAndUpdate(
    { name },
    { role: newRole },
    {
      runValidators: true,
    }
  );
  res.status(StatusCodes.OK).json({ msg: "User role updated" });
};
// Get All Users
const getAllUsers = async (req, res) => {
  const allUsers = await User.find({});
  res.status(StatusCodes.OK).json({ allUsers });
};
module.exports = { changeUserRole, getAllUsers };
