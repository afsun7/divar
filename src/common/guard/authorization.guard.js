const createHttpError = require("http-errors");
const AuthorizationMessage = require("../messages/auth.message");
const jwt = require("jsonwebtoken");
const UserModel = require("../../modules/user/user.model");

const authorization = async (req, res, next) => {
  try {
    const token = req?.cookie?.access_token;
    if (!token)
      throw new createHttpError.Unauthorized(AuthorizationMessage.login);
    const data = jwt.verify(token, process.env.COOKIE_SECRET_KEY);
    if (typeof data === "object" && "id" in data) {
      const user = await UserModel.findById(data.id, {
        accessToken: 0,
        otp: 0,
      }).lean();
      if (!user)
        throw new createHttpError.Unauthorized(
          AuthorizationMessage.notFoundAccount,
        );
      req.user = user;
      return next();
    }
    throw new createHttpError.Unauthorized(AuthorizationMessage.invalidToken);
  } catch (error) {
    next(error);
  }
};
