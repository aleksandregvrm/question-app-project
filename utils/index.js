const { createJWT, isTokenValid, attachCookiesToResponse } = require("./jwt");
const sendVerificationEmail = require("./sendVerificationEmail");
const createTokenUser = require("./createTokenUser");
const sendResetPasswordEmail = require("./sendResetPasswordEmail");
const hashString = require("./createHash");

module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
  createTokenUser,
  sendVerificationEmail,
  sendResetPasswordEmail,
  hashString,
};
