const User = require("../models/UserModel");
const Token = require("../models/TokenModel");
const QuizStats = require("../models/QuizStatsModel");
const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");
const { createTokenUser, attachCookiesToResponse } = require("../utils");
const {
  sendResetPasswordEmail,
  sendVerificationEmail,
  hashString,
} = require("../utils");
const crypto = require("crypto");

// Register User
const registerUser = async (req, res) => {
  const { email, password, name } = req.body;
  let role = "user";
  if (!email && !password && !name) {
    throw new CustomError.BadRequestError(
      "Please provide email,name and password"
    );
  }
  const firstTwoAccounts = (await User.countDocuments({})) < 2;
  if (firstTwoAccounts) {
    role = "admin";
  }
  const verificationToken = crypto.randomBytes(40).toString("hex");
  const user = await User.create({
    name,
    email,
    password,
    role,
    verificationToken,
  });
  console.log(user);
  const origin = "http://localhost:5173";
  await sendVerificationEmail({
    name: user.name,
    email: user.email,
    verificationToken: user.verificationToken,
    origin,
  });
  res.status(StatusCodes.CREATED).json({ user: { name, email } });
  res.send("dachi ylea");
};
// Verify User
const verifyUser = async (req, res) => {
  const { token: verificationToken, email } = req.query;
  console.log(verificationToken, email);
  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomError.UnauthorizedError("Verification Failed");
  }
  if (user.verificationToken !== verificationToken) {
    throw new CustomError.UnauthorizedError("Verification Failed");
  }

  user.isVerified = true;
  user.verifiedDate = new Date();
  user.verificationToken = "";

  await user.save();
  console.log("verification is a success");

  res.status(StatusCodes.OK).json({ msg: "Email Verified" });
};
// Login User ->
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new CustomError.BadRequestError("Please provide name and password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError.UnauthenticatedError("Invalid credentials");
  }
  const passwordCheck = await user.comparePassword(password);
  if (!passwordCheck) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }
  if (!user.isVerified) {
    throw new CustomError.UnauthenticatedError("This account is not verified");
  }
  const tokenUser = createTokenUser(user);

  let refreshToken = "";
  const existingToken = await Token.findOne({ user: user._id });
  const thirtyDays = 1000 * 60 * 60 * 24 * 30;
  const expirationTime = new Date(Date.now() + thirtyDays);
  if (existingToken) {
    const { isValid } = existingToken;
    if (!isValid) {
      throw new CustomError.UnauthenticatedError("Invalid Credentials");
    }
    refreshToken = existingToken.refreshToken;
    attachCookiesToResponse({
      res,
      user: tokenUser,
      refreshToken,
      expiresAt: expirationTime,
    });
    res.status(StatusCodes.OK).json({ user: tokenUser });
    return;
  }
  refreshToken = crypto.randomBytes(40).toString("hex");
  const userAgent = req.headers["user-agent"];
  const ip = req.ip;
  const userToken = {
    refreshToken,
    ip,
    userAgent,
    user: user._id,
    expires: expirationTime,
  };

  const token = await Token.create(userToken);

  attachCookiesToResponse({
    res,
    user: tokenUser,
    refreshToken,
    expiresAt: expirationTime,
  });

  res.status(StatusCodes.OK).json({ user: tokenUser });
};
// Logout
const logoutUser = async (req, res) => {
  await Token.findOneAndDelete(req.user.userId);
  res.cookie("accessToken", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.cookie("refreshToken", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};
// Change User
const changeUser = async (req, res) => {
  const { userId: id } = req.user;
  // productiion!!!
  // const id = "65c9d076e9946706b1b4f55d";
  // Temporary solution
  const { name, email } = req.body;
  if (!id || !name || !email) {
    throw new CustomError.BadRequestError("Please provide all the values");
  }
  const user = await User.findOne({ _id: id });
  if (name === user.name && email === user.email) {
    console.log(name, user.name, email, user.email);
    throw new CustomError.BadRequestError("Please provide different values");
  }
  if (!user) {
    throw new CustomError.NotFoundError(
      "There has been an error, try again later..."
    );
  }
  user.name = name;
  user.email = email;
  await user.save();
  await QuizStats.findOneAndUpdate({ user: id }, { name }, { new: true });
  await Token.findOneAndDelete({ user: id });
  res.status(StatusCodes.OK).json({ msg: "User Updated, Please re-login" });
};
// Change Password
const changePassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new CustomError.BadRequestError("Please provide email");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError.BadRequestError(
      `No user found with an email: ${email}`
    );
  }
  const passwordToken = crypto.randomBytes(70).toString("hex");
  const origin = "http://localhost:5173";
  await sendResetPasswordEmail({
    name: user.name,
    email: user.email,
    token: passwordToken,
    origin,
  });

  const fifteenMinutes = 1000 * 60 * 15;
  const passwordTokenExpirationDate = new Date(Date.now() + fifteenMinutes);

  user.passwordToken = hashString(passwordToken);
  user.passwordTokenExpirationDate = passwordTokenExpirationDate;
  await user.save();
  res
    .status(StatusCodes.OK)
    .json({ msg: "Please check your email for reset password link" });
};
// Reset Password
const resetPassword = async (req, res) => {
  const { token, email, password } = req.body;
  if (!token || !email || !password) {
    throw new CustomError.BadRequestError("Please provide all values");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError.BadRequestError(
      `No user found with an email: ${email}`
    );
  }
  const currentDate = new Date();
  if (
    user.passwordToken === token &&
    user.passwordTokenExpirationDate > currentDate
  ) {
    user.password = password;
    user.passwordToken = null;
    user.passwordTokenExpirationDate = null;
    await user.save();
    res.status(StatusCodes.OK).json({ msg: "Password Changed" });
  }
  throw new CustomError.BadRequestError(
    "Error with resetting the password try again later..."
  );
};
const deleteUser = async (req, res) => {
  const id = "65cb48cd46297490a305f828";
  const user = await User.findOne({ _id: id });
  const token = await Token.findOne({ user: id });
  if (token) {
    await token.deleteOne();
  }
  await user.deleteOne();
  res.status(StatusCodes.OK).json({ msg: "user deleted" });
};
module.exports = {
  registerUser,
  verifyUser,
  loginUser,
  logoutUser,
  changeUser,
  changePassword,
  resetPassword,
  deleteUser,
};
