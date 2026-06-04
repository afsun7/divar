const { default: autoBind } = require("auto-bind");
const authService = require("./auth.service");
const { AuthMessage } = require("./auth.messages");

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
      return {
        message: AuthMessage.sendOtpSuccessfully,
      };
    } catch (error) {
      next(error);
    }
  }
  async checkOTP(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new AuthController();
