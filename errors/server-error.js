const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("./custom-api");

class ServerError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}
module.exports = ServerError;
