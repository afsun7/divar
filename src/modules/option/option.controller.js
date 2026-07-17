const { default: autoBind } = require("auto-bind");
const optionService = require("./option.service");
const httpCode = require("http-codes");
const { OptionMessage } = require("./option.message");

class OptionController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = optionService;
  }

  async create(req, res, next) {
    try {
      const { title, key, type, enum: list, guid, category } = req.body;
      await this.#service.create({
        title,
        key,
        type,
        enum: list,
        guid,
        category,
      });
      return res.status(httpCode.CREATED).json({
        message: OptionMessage.Created,
      });
    } catch (error) {
      next(error);
    }
  }
  async findByCategoryId(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
  async findById(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }

  async find(req, res, next) {
    try {
      const option = await this.#service.find({});
      return res.json(option);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new OptionController();
