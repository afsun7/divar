const { default: autoBind } = require("auto-bind");
const authService = require("./auth.service");
const { AuthMessage } = require("./auth.messages");
const NodeEnv = require("../../common/constant/env.enum");
const CookieNames = require("../../common/constant/cookie.enum");

class AuthController {
  #service;
  constructor() {
    // this.sendOTP = this.sendOTP.bind(this);
    autoBind(this);
    this.#service = authService;
  }
  async sendOTP(req, res, next) {
    try {
      const { mobile } = req.body;
      await this.#service.sendOTP(mobile);
      return res.status(200).json({
        message: AuthMessage.sendOtpSuccessfully,
      });
    } catch (error) {
      next(error);
    }
  }
  async checkOTP(req, res, next) {
    try {
      const { mobile, code } = req.body;

      const token = await this.#service.checkOTP(mobile, code);
      res
        .cookie(CookieNames.AccessToken, token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === NodeEnv.Production,
        })
        .status(200)
        .json({
          message: AuthMessage.LoginSuccessfully,
        });
    } catch (error) {
      next(error);
    }
  }
  async logout(req, res, next) {
    try {
      return res.clearCookie(CookieNames.AccessToken).status(200).json({
        message: AuthMessage.LogoutSuccessfully,
      });
    } catch (error) {
      next(error);
    }
  }
}
//Singleton
module.exports = new AuthController();
