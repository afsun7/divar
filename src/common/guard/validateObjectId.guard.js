const createHttpError = require("http-errors");
const { isValidObjectId } = require("mongoose");
const CommonMessage = require("../messages/common.message");

const ValidateObjectId = (req, res, next) => {
  try {
    const ids = Object.values(req.params);
    for (const id of ids) {
      if (!isValidObjectId(id)) {
        throw new createHttpError.BadRequest(CommonMessage.InvalidObjectId);
      }
    }
    return next();
  } catch (error) {
    next(error);
  }
};
module.exports = ValidateObjectId;
